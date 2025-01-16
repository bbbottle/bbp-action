const {DefaultArtifactClient} = require('@actions/artifact')
const fs = require('fs');
const path = require('path');

const getArtifactId = async (artifactClient, artifactName) => {
  const artifactInfo = await artifactClient.getArtifact(artifactName);
  return artifactInfo?.artifact.id;
}

const createDownloader = (artifactClient) => async (artifactName, fileName, encoding) => {
  const artifactId = await getArtifactId(artifactClient, artifactName);
  const downloadPath = path.join(__dirname, 'artifacts');
  const downloadResponse = await artifactClient.downloadArtifact(artifactId, {
    path: downloadPath
  });

  return fs.readFileSync(path.join(downloadResponse.downloadPath, fileName), encoding);
}

export const download = createDownloader(new DefaultArtifactClient());
