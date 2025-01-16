import { Vercel } from "@vercel/sdk";
const core = require('@actions/core');

const vercel = new Vercel({
  bearerToken: core.getInput('token')
});

export const fetchVercelSecrets = async () => {
  return  vercel.projects.filterProjectEnvs({
    idOrName: "prj_h4XkOQ6vW1uHcVf9usvqwNsK43PH",
    decrypt: "True"
  })
}

export const PickSecrets = (vercelSecrets, secretsName) => {
  const secrets = {};
  console.log(JSON.stringify(vercelSecrets, null, 2));
  if (!vercelSecrets || !vercelSecrets.envs) {
    return secrets
  }

  secretsName.forEach(name => {
    secrets[name] = vercelSecrets.envs.find(secret => secret.key === name).value;
  });

  return secrets;
}
