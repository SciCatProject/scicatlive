# Track 2 — A PATCH endpoint: proving why `generate_sdk` matters

**Repos involved:** `backend`, `frontend`

## The story

The backend's only config-update mechanism is `PUT`, which replaces the whole stored blob — so a partial update
silently deletes every other field. The fix is a proper `PATCH` endpoint with real partial-update semantics: send
only the fields you want to change, merge just those in. This is effectively [JSON Merge Patch (RFC
7396)](https://www.rfc-editor.org/rfc/rfc7396).

## Step by step

Assumes the [shared setup](demo.md#shared-setup) is done.

1. **Reproduce the bug.** Open the admin config editor (`/admin/configuration`) in two browser tabs, both loaded
   fresh. Edit and save one field in the first tab. Edit and save a *different* field in the second tab (still
   holding the config as it looked before the first save). Reload either tab: the first tab's change is gone.

2. **Design the endpoint.** Not "read the document, merge in memory, write it back" — that's still racy (two
   concurrent patches to different fields can stomp on each other). Instead, one atomic MongoDB `$set`, whose keys
   are the incoming patch flattened into full dot-notation paths (`data.<key>`, `data.<key>.<nested>`), so patches to
   different leaves — even within the same nested section — always both succeed.

   Lives in the existing runtime-config module: a new DTO in
   [`src/config/runtime-config/dto/`](https://github.com/SciCatProject/backend/tree/master/src/config/runtime-config/dto),
   a flatten helper in
   [`src/common/utils.ts`](https://github.com/SciCatProject/backend/blob/master/src/common/utils.ts), the new
   `patchConfig` method in
   [`runtime-config.service.ts`](https://github.com/SciCatProject/backend/blob/master/src/config/runtime-config/runtime-config.service.ts),
   and a new `@Patch(':id')` route on
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

   Optional, if time allows: add a test in
   [`test/RuntimeConfig.js`](https://github.com/SciCatProject/backend/blob/master/test/RuntimeConfig.js), run via
   `npm run start:test` in one terminal and `npm run test:api:mocha` in another.

3. **Commit and push the backend branch** (new DTO, controller route with proper Swagger decorators, atomic service
   method).

4. **Regenerate the SDK.** If the frontend dev server is running, stop it first (`generate_sdk` reinstalls its SDK
   dependency, which a live dev server can't pick up mid-run). Make sure the backend is running, then run
   `generate_sdk` from the frontend container. Diff the generated client:
   `runtimeConfigControllerPatchConfigV3()` is a method that didn't exist a moment ago. Start the frontend dev server
   back up.

5. **Wire it into the admin editor.**
   [`admin-config-edit.component.ts`](https://github.com/SciCatProject/frontend/blob/be_conf/src/app/admin/admin-config-edit/admin-config-edit.component.ts)
   currently sends its whole edited object (`currentData`) via `PUT`. Keep an untouched snapshot (`originalData`)
   alongside it; `save()` now diffs the two recursively (arrays compared as a whole, since the backend patch merges
   nested objects but not array elements) and PATCHes only what changed.

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

6. **Prove it.** Repeat step 1's reproduction exactly. This time both edits survive.

7. **Contribute upstream.** Commit and push the frontend branch; open a PR alongside the backend one. (A proper PR
   would also add tests for `save()`'s new diff-and-patch behavior — skipped here to stay focused.)

See also: [demo.md](demo.md) for the overview, and [Track 1](track1.md) for the config-loading/backend-restart track.
