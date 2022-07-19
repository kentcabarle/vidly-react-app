// import Raven from "raven-js";
// Uncomment if Raven is to be implemented

function init() {
  // Raven.config("https://c17c04dba71744af9efb3a9384e2c858@o1321486.ingest.sentry.io/6578173", {
  //   release: "1-0-0",
  //   environment: "development-test",
  // }).install();
}

function log(error) {
  // Raven.captureException(error);
  console.log(error);
}

export default {
  init,
  log,
};
