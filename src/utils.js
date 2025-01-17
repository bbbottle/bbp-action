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

    const secrets = {};
    for (const secret of result.secrets) {
      secrets[secret.name] = secret.static_version.value;
    }

    return secrets;
}

export const PickSecrets = async (allSecretsMap, secretsName) => {
  const secrets = {};
  for (const name of secretsName) {
    if (allSecretsMap[name]) {
      secrets[name] = allSecretsMap[name];
    }
  }

  return secrets;
}
