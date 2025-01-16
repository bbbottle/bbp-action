const core = require('@actions/core');
const {fetchVercelSecrets} = require('./utils');

async function run() {
  try {
    const res = await fetchVercelSecrets(core.getInput('token'));
    core.info(JSON.stringify(res, null, 2));
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run().then(() => {});
