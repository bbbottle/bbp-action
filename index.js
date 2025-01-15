const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');

try {
  const pluginPath = path.join(__dirname, 'plugin.json');
  if (!fs.existsSync(pluginPath)) {
    throw new Error(`File not found: ${pluginPath}`);
  }
  const pluginData = fs.readFileSync(pluginPath, 'utf-8');
  console.log('Plugin data:', pluginData);
} catch (error) {
  core.setFailed(`Action failed with error: ${error.message}`);
}