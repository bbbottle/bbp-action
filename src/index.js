const core = require('@actions/core');
const {fetchHCPSecrets} = require('./utils');
const {createUploader} = require('./upload');
const {download} = require('./download');

async function run() {
  try {
    const res = await fetchHCPSecrets()

    // create uploader
    const upload = createUploader(res)

    // upload wasm to OSS
    const wasmName = core.getInput('wasm');
    const wasmFile = await download('wasm-file', wasmName);
    await upload(wasmName, wasmFile);

    // fetch plugin config
    const pluginConfig = await download('plugin-config', 'plugin.json', 'utf8');

    // upsert to supabase
    // TODO: implement upsert to supabase
    core.info(pluginConfig);
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run().then(() => {});
