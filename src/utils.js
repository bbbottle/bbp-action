import { Vercel } from "@vercel/sdk";
const core = require('@actions/core');

const vercel = new Vercel({
  bearerToken: core.getInput('token')
});

export const fetchVercelSecrets = async () => {
  return  vercel.projects.filterProjectEnvs({
    idOrName: "prj_h4XkOQ6vW1uHcVf9usvqwNsK43PH",
    decrypt: "true"
  })
}

export const fetchVercelEnv = async (id) => {
  return vercel.projects.getProjectEnv({
    idOrName: "prj_h4XkOQ6vW1uHcVf9usvqwNsK43PH",
    id,
  })
}

export const PickSecrets = async (vercelSecrets, secretsName) => {
  const secrets = {};
  if (!vercelSecrets || !vercelSecrets.envs) {
    return secrets
  }

  const res = await Promise.all(vercelSecrets.envs
    .filter((env) => {
      return secretsName.includes(env.key)
    })
    .map(env => {
      return fetchVercelEnv(env.id)
    }))

  res.forEach((env) => {
    console.log("env: " + JSON.stringify(env, null, 2));
    secrets[env.key] = env.value;
  });

  return secrets;
}
