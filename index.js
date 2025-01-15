const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);

  const data = fs.readFileSync('plugin.json', 'utf8');
  const jsonData = JSON.parse(data);

  // 输出 JSON 数据
  console.log(jsonData);
} catch (error) {
  core.setFailed(error.message);
}


