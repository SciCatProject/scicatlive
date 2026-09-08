# Track 2 — A PATCH endpoint: proving why `generate_sdk` matters

**Repos involved:** `backend`, `frontend` (consumes the regenerated SDK)
**What this teaches:** the actual, concrete value of SciCat's `generate_sdk` workflow — not as an abstract "keeps things
in sync" claim, but as something the group watches happen: a client method that simply doesn't exist until they
regenerate it.
**SDK impact:** central to the track. Without running `generate_sdk`, none of the frontend work in this track is even
possible to write, let alone compile.

## The story

This track starts from a real request: an admin user wants to change a single field of the frontend's runtime
configuration programmatically, without touching anything else. Today, that's not safely possible — the backend's only
update mechanism is a `PUT`, and it does a full replace of the entire configuration blob. If an admin (or the admin UI
itself) sends an update containing only the one field they meant to change, the backend happily stores exactly that —
and quietly deletes every other setting that used to be there. That's not a hypothetical: it's how the existing endpoint
is written today.

The right fix is a `PATCH` endpoint with proper partial-update semantics: send only the fields you want to change, and
the backend merges just those into what's already stored, leaving everything else exactly as it was. This is effectively
[JSON Merge Patch (RFC 7396)](https://www.rfc-editor.org/rfc/rfc7396) — a well-established, named pattern for exactly
this problem, not something bespoke.

## Step by step

Assumes the [shared setup](demo.md#shared-setup) is done: scicatlive running in dev mode, both containers attached, and
the frontend container checked out on `be_conf` (which is where the admin editor this track wires into already lives).

1. **Reproduce today's bug.** Open the admin config editor (`/admin/configuration`) in two browser tabs, both loaded
   fresh. In the first tab, edit one field and save. In the second tab — still holding the config as it looked before
   that save — edit a *different* field and save. Reload either tab: the first tab's change is gone, silently wiped out
   by the second save's stale, full-object `PUT`. This is the motivating evidence for everything that follows — the
   group isn't fixing an imagined problem.

2. **Design the endpoint correctly, first try.** Rather than a naive "read the document, merge in memory, write the
   whole thing back" implementation (which introduces its own subtle race — two concurrent partial updates to
   *different* fields can still stomp on each other if both read the same stale snapshot before either writes), the
   endpoint is built directly as an atomic operation: a single MongoDB `$set` whose keys are the incoming patch
   flattened into full dot-notation paths (`data.<key>` for a top-level field, `data.<key>.<nested>` for anything
   deeper), not just the top level — so a patch can safely touch one leaf buried inside a nested object without
   disturbing its siblings. Because MongoDB applies each of those key-paths atomically server-side, there's no
   read-then-write window at all — nothing can go stale in between, because there's no "in between." Two admins patching
   different sections — or even different leaves of the same nested section — at the same moment both simply succeed.

   This lives in the backend's existing runtime-config module: a new DTO alongside the others in
   [`src/config/runtime-config/dto/`](https://github.com/SciCatProject/backend/tree/master/src/config/runtime-config/dto),
   the flattening helper below in
   [`src/common/utils.ts`](https://github.com/SciCatProject/backend/blob/master/src/common/utils.ts) (next to the
   other shared helpers
   [`runtime-config.service.ts`](https://github.com/SciCatProject/backend/blob/master/src/config/runtime-config/runtime-config.service.ts)
   already imports from there), and the new `patchConfig` method itself in that same
   [`runtime-config.service.ts`](https://github.com/SciCatProject/backend/blob/master/src/config/runtime-config/runtime-config.service.ts),
   called from a new `@Patch(':id')` route on
   [`runtime-config.controller.ts`](https://github.com/SciCatProject/backend/blob/master/src/config/runtime-config/runtime-config.controller.ts).

   ```ts
   // Recursively flattens a nested object into Mongo dot-notation paths, e.g.
   // { a: { b: 1, c: null } } -> { "a.b": 1, "a.c": null }, so callers can $set
   // only the provided leaves without touching sibling fields.
   export const flattenToMongoDotNotation = (
     obj: Record<string, unknown>,
     prefix = "",
   ): Record<string, unknown> => {
     return Object.entries(obj).reduce<Record<string, unknown>>(
       (acc, [key, value]) => {
         const path = prefix ? `${prefix}.${key}` : key;
         if (IsRecord(value) && Object.keys(value).length > 0) {
           Object.assign(acc, flattenToMongoDotNotation(value, path));
         } else {
           acc[path] = value;
         }
         return acc;
       },
       {},
     );
   };
   ```

   Optional, if time allows — the endpoint itself is the core deliverable here, not the test — add a test for it in
   [`test/RuntimeConfig.js`](https://github.com/SciCatProject/backend/blob/master/test/RuntimeConfig.js), alongside
   the existing PUT tests, covering that a partial PATCH merges into the stored document instead of replacing it.
   Test it against the backend's own e2e setup: `npm run start:test` in one terminal (boots the backend with the test
   config), `npm run test:api:mocha` in another (runs the mocha suite, including the new test).

3. **Backend done.** Commit and push the branch (in a new branch) — a new DTO, a new controller route with the correct
   Swagger decorators (so it's properly documented, not hidden behind a generic `Object` type the way the existing `PUT`
   unfortunately is), and the atomic service method.

4. **Regenerate the SDK — and show the diff.** If the frontend dev server is already running, stop it first (`Ctrl+C` on
   the `npm start -- --host 0.0.0.0` process) — `generate_sdk` reinstalls the frontend's SDK dependency, which a live
   dev server can't safely pick up mid-run. Then, from the frontend container, run `generate_sdk` (make sure the backend
   from step 3 is running — `generate_sdk` generates the client from the live backend's OpenAPI spec, so without it
   there's nothing to generate from). This is the actual moment the track exists to deliver: open the generated client
   before and after, and point at the fact that `runtimeConfigControllerPatchConfigV3()` simply was not a method a
   moment ago. There was no way to call this endpoint from TypeScript with any type safety — now there is, for free,
   from one command. Once it's done, start the frontend back up with the same `npm start -- --host 0.0.0.0`.

5. **Wire it into the real admin editor — not a bolt-on demo widget.** The existing admin configuration editor
   ([`admin-config-edit.component.ts`](https://github.com/SciCatProject/frontend/blob/be_conf/src/app/admin/admin-config-edit/admin-config-edit.component.ts),
   built in [PR #2517](https://github.com/SciCatProject/frontend/pull/2517), using JSONForms) currently keeps only the
   live, in-progress edited state (`currentData`) in memory; its `save()` dispatches that entire object via `PUT`. The
   fix here is small: keep a second, untouched copy of the config as it was when loaded (`originalData`) alongside
   `currentData`. `save()` then computes the difference between the two recursively — matching the granularity the
   backend's PATCH now merges at (any nested leaf, not just the top level): plain objects are walked key by key and only
   their genuinely-changed leaves included, while arrays are compared and kept as a whole, since the backend patch
   merges nested objects but not array elements. Only the resulting diff is sent via the new
   `runtimeConfigControllerPatchConfigV3()` call from step 4.

   ```ts
   // Recursively computes the parts of `updated` that differ from `original`.
   // Arrays are compared as a whole since the backend patch merges nested
   // objects but not array elements.
   diff(
     original: Record<string, unknown>,
     updated: Record<string, unknown>,
   ): Record<string, unknown> {
     return transform(updated, (result, value, key) => {
       const originalValue = original?.[key];
       if (!isEqual(value, originalValue)) {
         result[key] =
           isPlainObject(value) && isPlainObject(originalValue)
             ? this.diff(
                 originalValue as Record<string, unknown>,
                 value as Record<string, unknown>,
               )
             : value;
       }
     });
   }
   ```

6. **Prove it, reliably.** Repeat step 1's reproduction exactly: two admin editor tabs, a different field edited and
   saved in each, then reload. This time both changes survive — same setup, opposite outcome, because each save now only
   PATCHes the leaves it actually changed instead of overwriting the whole document. This is a deterministic test, not a
   timing-sensitive one: there's no race to catch in the act, just the same two edits that clobbered each other in step
   1, now not clobbering each other at all.

7. **Contribute upstream.** Commit and push the frontend branch (in a new branch); open a PR alongside the backend one.
   (A proper PR would also add tests for `save()`'s new diff-and-patch behavior — kept out of this demo to keep the
   track focused.)

See also: [demo.md](demo.md) for the overview, and [Track 1](track1.md) for the config-loading/backend-restart track.
