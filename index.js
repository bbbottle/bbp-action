const core = require('@actions/core');
const github = require('@actions/github');
const {DefaultArtifactClient} = require('@actions/artifact')
const fs = require('fs');
const path = require('path');

const getArtifactId = async (artifactClient, artifactName) => {
  const artifactInfo = await artifactClient.getArtifact(artifactName);
  return artifactInfo?.artifact.id;
}

const createDownloader = (artifactClient) => async (artifactName, encoding) => {
    const artifactId = await getArtifactId(artifactClient, artifactName);
    const downloadPath = path.join(__dirname, 'artifacts');
    const downloadResponse = await artifactClient.downloadArtifact(artifactId, {
      path: downloadPath
    });

    return fs.readFileSync(downloadResponse.downloadPath, encoding);
}

async function run() {
  try {
    const downloader = createDownloader(new DefaultArtifactClient());
    const pluginData = await downloader('plugin-json', 'utf-8');
    console.log(pluginData);

    const wasmFile = await downloader('wasm-file');
    console.log(wasmFile.buffer);

  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();