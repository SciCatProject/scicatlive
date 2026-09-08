"use strict";

exports.accessGroupsToProfile =
  function (req, done) {
    return async function (err, user, identity, token) {
      await user.identities.destroyAll({ and: [
        { provider: identity.provider },
        { id: { neq: identity.id } },
        { userId: user.id }
      ] });
      identity.updateAttributes({
        "profile": {
          accessGroups: identity.profile._json.accessGroups,
          email: identity.profile._json.email,
          ...identity.profile
        },
        "credentials": null });
      var authInfo = {
        identity: identity,
      };
      if (token) {
        authInfo.accessToken = token;
      }
      done(err, user, authInfo);
    };
  };
