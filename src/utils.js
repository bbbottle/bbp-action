import { Vercel } from "@vercel/sdk";
const core = require('@actions/core');

const vercel = new Vercel({
  bearerToken: core.getInput('token')
});

export const fetchVercelSecrets = async () => {
  return  vercel.projects.filterProjectEnvs({
    idOrName: "prj_h4XkOQ6vW1uHcVf9usvqwNsK43PH",
  })
}
