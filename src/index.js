const core = require('@actions/core');
const {fetchHCPSecrets} = require('./utils');
const {createUploader} = require('./upload');
const {createConfigUpdater} = require('./update');
const {download} = require('./download');

async function run() {
  try {
    // const res = await fetchHCPSecrets()

    // create uploader
    // const upload = createUploader(res)

    // upload wasm to OSS
    // const wasmName = core.getInput('wasm');
    // const wasmFile = await download('wasm-file', wasmName);
    // const uploadRes = await upload(wasmName, wasmFile);

    // fetch plugin config
    const pluginConfig = await download('plugin-config', 'plugin.json', 'utf8');
    // const update = createConfigUpdater(res);

    console.log(pluginConfig);

    console.log("parsed", JSON.parse(PluginConfig))

    // update({
    //   ...pluginConfig,
    //   url: uploadRes.url,
    // });

  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run().then(() => {});
