const core = require('@actions/core');
export const fetchHCPSecrets = async () => {
      // Fetch secrets from HashiCorp Vault
    const hcpApiToken = core.getInput('token');
    const response = await fetch('https://api.cloud.hashicorp.com/secrets/2023-11-28/organizations/9a9e436c-5d79-4f01-80cb-27da22b47385/projects/7af0577c-801c-4443-9430-6dd478e50e56/apps/bbaction/secrets:open', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${hcpApiToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch secrets: ${response.statusText}`);
    }

    const result = await response.json();
    if (!result.secrets || !result.secrets.length) {
      throw new Error('Failed to fetch hcp secrets');
    }

    return result.secrets.map(s => ({
      key: s.name,
      value: s.static_version.value
    }))
}

export const PickSecrets = (allSecrets, secretsName) => {
  const secrets = {};
  for (const name of secretsName) {
    const secret = allSecrets.find(s => s.key === name);
    if (secret) {
      secrets[name] = secret.value;
    }
  }

  return secrets;
}
