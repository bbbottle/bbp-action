const core = require('@actions/core');
const {fetchVercelSecrets} = require('./utils');
const {createUploader} = require('./upload');
const {download} = require('./download');

async function run() {
  try {
    const res = await fetchVercelSecrets();
    const upload = createUploader(res)
    const wasmFile = await download('wasm-file', 'page_now.wasm');
    await upload('page_now.wasm', wasmFile);

    const pluginConfig = await download('plugin-config', 'plugin.json', 'utf8');
    core.info(JSON.parse(pluginConfig));
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run().then(() => {});
