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
