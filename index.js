const core = require('@actions/core');
const github = require('@actions/github');
const {DefaultArtifactClient} = require('@actions/artifact')
const fs = require('fs');
const path = require('path');

async function run() {
  try {
    const artifactClient = new DefaultArtifactClient();
    const downloadPath = path.join(__dirname, 'artifacts');
    const artifactName = 'plugin-json'; // 替换为你的工件名称

    // 下载工件
    const downloadResponse = await artifactClient.downloadArtifact(artifactName, downloadPath);
    
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