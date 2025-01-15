const core = require('@actions/core');
const github = require('@actions/github');
const {DefaultArtifactClient} = require('@actions/artifact')
const fs = require('fs');
const path = require('path');

async function run() {
  try {
    const artifactClient = new DefaultArtifactClient();
    const downloadPath = path.join(__dirname, 'artifacts');

    // 下载工件
    const artifactInfo = await artifactClient.getArtifact('plugin-json');
    const downloadResponse = await artifactClient.downloadArtifact(artifactInfo?.artifact.id, downloadPath);
    
    // log response
    console.log('Downloaded artifact:', JSON.stringify(downloadResponse, null, 2));

    const pluginPath = path.join(downloadResponse.downloadPath, 'plugin.json');

    if (!fs.existsSync(pluginPath)) {
      throw new Error(`File not found: ${pluginPath}`);
    }

    const pluginData = fs.readFileSync(pluginPath, 'utf-8');
    console.log('Plugin data:', pluginData);

    // 设置输出
    core.setOutput('pluginData', pluginData);
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();