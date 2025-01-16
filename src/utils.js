import fs from 'fs';
import path from 'path';

export const getPluginConfig = () => {
  const file = fs.readFileSync(path.join(__dirname, 'plugin.json'), 'utf8');
  return JSON.parse(file);
}

export const getWasmFile = (fileName) => {
  const filePath = path.join(__dirname, `target/wasm32-unknown-unknown/release/${fileName}`);
  return fs.readFileSync(filePath);
}

const buildVercelEndpoint = (pid, slug, tid) => {
  return `https://api.vercel.com/v3/secrets?projectId=${pid}&slug=${slug}&teamId=${tid}`;
}

export const fetchVercelSecrets = async (token) => {
  const endpoint = buildVercelEndpoint(
    "prj_h4XkOQ6vW1uHcVf9usvqwNsK43PH",
    "bbkings-projects-cfe0ee93",
    "team_MIsUMNw4utGbdrDSmat8F2Y6"
  );

  return await fetch(endpoint, {
    "headers": {
      "Authorization": `Bearer ${token}`
    },
    "method": "get"
  })
}
