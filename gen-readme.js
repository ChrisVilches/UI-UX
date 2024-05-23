// TODO: Lint & format
const fs = require('fs-extra');
const { appUrl, getAllAppNames } = require("./util");
const path = require('path');

const GITHUB_USER = 'ChrisVilches'
const GITHUB_REPO = 'UI-UX'
const IMG_WIDTH = 100

function printAppInfoMarkdown(app) {
  const packageJsonPath = path.join(app, 'package.json');
  const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  const name = packageData.name || app;
  const description = packageData.description || '';
  const url = appUrl(app)

  console.log(`## ${name} ([Live Demo](${url}))`);
  console.log(description);
  const imgSrc = `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/blob/main/screenshots/${app}.jpg?raw=true`
  console.log(`![${name}](${imgSrc} | width=${IMG_WIDTH})`)
  console.log();
}

for (const app of getAllAppNames()) {
  printAppInfoMarkdown(app);
}
