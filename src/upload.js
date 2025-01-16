const OSS = require("ali-oss");
const core = require('@actions/core');

const client = new OSS({
  region: core.getInput('OSS_REGION'),
  accessKeyId: core.getInput('OSS_ACCESS_KEY_ID'),
  accessKeySecret: core.getInput('OSS_ACCESS_KEY_SECRET'),
  bucket: core.getInput('OSS_BUCKET_NAME'),
  endpoint: core.getInput('OSS_BUCKET_ENDPOINT'),
  secure: true,
});

export const upload = (name, file) => {
  return client.put(name, file);
};
