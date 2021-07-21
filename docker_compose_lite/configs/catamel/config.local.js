var p = require("../package.json");
var version = p.version.split(".").shift();
module.exports = {
  restApiRoot: "/api" + (version > 0 ? "/v" + version : ""),
  host: process.env.HOST || "0.0.0.0",
  port: process.env.PORT || 3000,
  pidPrefix: "PutYourPIDPrefixHere",
  doiPrefix: "PutYourDOIPrefixHere",
  logbookEnabled: false,
  scichatURL: "localhost:3030/scichatapi",
  scichatUser: "logbookReader",
  scichatPass: "InsertPasswordHere",
  datasetReductionEnabled: false,
  reductionKafkaBroker: "kafka:9092",
  reductionKafkaInputTopic: "reduce_input",
  reductionKafkaOutputTopic: "reduce_output",
  policyPublicationShiftInYears: 3,
  policyRetentionShiftInYears: 10,
  site: "ESS",
  facilities: ["Facility1", "Facility2"],
  metadataKeysReturnLimit: 100,
  grayLog: {
    enabled: false,
    host: "my.graylog.host",
    port: 0000,
    facility: "facility",
    owner: "owner",
    service: "service",
  },

  datasetStatusMessages: {
    datasetCreated: "Dataset created",
    datasetOndisk: "Stored on primary disk and on archive disk",
    datasetOnDiskAndTape: "Stored on primary disk and on tape",
    datasetOnTape: "Stored only in archive",
    datasetRetrieved: "Retrieved to target disk",
    datasetDeleted: "Deleted from archive and disk",
  },
  datasetTransitionMessages: {
    scheduleArchive: "Scheduled for archiving",
    schedulePurgeFromDisk: "Scheduled for purging from primary disk",
    scheduleRetrieve: "Scheduled for retrieval",
    scheduleDelete: "Scheduled for removal from archive",
  },
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
      host: 'mysmtp.exch.com',
      port: 587,
      secure: true    },
    smtpMessage: {
      from: '',
      to: undefined,
      subject: '[SciCat '+process.env.NODE_ENV+']',
      text: undefined // can also set html key and this will override this
    },

};
