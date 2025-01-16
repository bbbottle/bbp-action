const core = require('@actions/core');
const {download} = require('./download');
const {upload} = require('./upload');
const {getPluginConfig, getWasmFile} = require('./utils');

async function run() {
  try {
    // const pluginData = await download(
    //   core.getInput('configArtifactName'),
    //   core.getInput('configFileName'),
    //   'utf-8'
    // );

    // console.log(pluginData);
    console.log(getPluginConfig());

    const wasmName = core.getInput('wasmFileName');
    const wasmFile = getWasmFile(wasmName);
    // const wasmFile = await download(
    //   core.getInput('wasmArtifactName'),
    //   wasmName
    // );
    //
    // console.log(`Uploading ${wasmName} to OSS... ${wasmFile.length} bytes`);
    //
    const res = await upload(`plugins/${wasmName}`, wasmFile);
    console.log(JSON.stringify(res, null, 2));

  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run().then(() => {});
