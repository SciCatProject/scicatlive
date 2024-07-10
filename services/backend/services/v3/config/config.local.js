"use strict";

var p = require("../package.json");
var version = p.version.split(".").shift();
module.exports = {
  restApiRoot: "/api" + (version > 0 ? "/v" + version : ""),
  host: process.env.HOST || "0.0.0.0",
  port: process.env.PORT || 3000,
  pidPrefix: "PID.SAMPLE.PREFIX",
  doiPrefix: "DOI.SAMPLE.PREFIX",
  policyPublicationShiftInYears: 3,
  policyRetentionShiftInYears: 10,
  metadataKeysReturnLimit:100,
  site: "SAMPLE-SITE",
  facilities: ["Facility1", "Facility2"],
  jobMessages: {
    jobSubmitted: "Submitted for immediate execution",
    jobSubmittedDelayed: "Submitted for delayed execution",
    jobForwarded: "Forwarded to archive system",
    jobStarted: "Execution started",
    jobInProgress: "Finished by %i percent",
    jobSuccess: "Successfully finished",
    jobError: "Finished with errors",
    jobCancel: "Cancelled",
  },
  smtpSettings: {
    host: "SMTP.YOUR.DOMAIN",
    port: 25,
    secure: false,
  },
  smtpMessage: {
    from: "scicatarchivemanager@YOUR.DOMAIN",
    to: undefined,
    subject: "[SciCat " + process.env.NODE_ENV + "]",
    text: undefined, // can also set html key and this will override this
  },
  queue: process.env.JOBS_ENABLED? "rabbitmq": undefined,
  logbook: {
    enabled: false
  },
  expressSessionSecret: process.env.OIDC_ENABLED? "someSecret": undefined
};
