const buildVercelEndpoint = (pid, slug, tid) => {
  return `https://api.vercel.com/v3/secrets?projectId=${pid}&slug=${slug}&teamId=${tid}`;
}

export const fetchVercelSecrets = async (token) => {
  const endpoint = buildVercelEndpoint(
    "prj_h4XkOQ6vW1uHcVf9usvqwNsK43PH",
    "bbkings-projects-cfe0ee93",
    "team_MIsUMNw4utGbdrDSmat8F2Y6"
  );

  return fetch(endpoint, {
    "headers": {
      "Authorization": `Bearer ${token}`
    },
    "method": "get"
  })
}
