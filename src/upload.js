import OSS from 'ali-oss';
import { PickSecrets } from './utils';

const UPLOAD_SECRET_NAMES = [
  'OSS_ACCESS_KEY_ID',
  'OSS_ACCESS_KEY_SECRET',
  'OSS_BUCKET_NAME',
  'OSS_BUCKET_ENDPOINT',
  'OSS_REGION'
];

export const createUploader = (s = {}) => async (name, file) => {
  const secrets = PickSecrets(s, UPLOAD_SECRET_NAMES);
  const client = new OSS({
    region: secrets.OSS_REGION,
    accessKeyId: secrets.OSS_ACCESS_KEY_ID,
    accessKeySecret: secrets.OSS_ACCESS_KEY_SECRET,
    bucket: secrets.OSS_BUCKET_NAME,
    endpoint: secrets.OSS_BUCKET_ENDPOINT,
    secure: true,
  });

  return client.put(name, file);
}
