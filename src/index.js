const core = require('@actions/core');
const {download} = require('./download');
const {upload} = require('./upload');
const {getPluginConfig, getWasmFile, fetchVercelSecrets} = require('./utils');

async function run() {
  try {
    const res = fetchVercelSecrets(core.getInput('VERCEL_TOKEN'));
    console.log(JSON.stringify(res, null, 2));
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run().then(() => {});
