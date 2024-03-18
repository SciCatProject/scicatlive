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
  site: "SAMPLE-SITE",
};
