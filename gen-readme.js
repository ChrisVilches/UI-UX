// TODO: Lint & format
const fs = require('fs-extra');
const { appUrl, getAllAppNames } = require("./util");
const path = require('path');

const GITHUB_USER = 'ChrisVilches'
const GITHUB_REPO = 'UI-UX'
const IMG_WIDTH = 250

function printAppInfoMarkdown(app) {
  const packageJsonPath = path.join(app, 'package.json');
  const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  const name = packageData.name || app;
  const description = packageData.description || '';
  const url = appUrl(app)
  const imgSrc = `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/blob/main/screenshots/${app}.jpg?raw=true`

  console.log(`| [<img src="${imgSrc}" width=${IMG_WIDTH}>](${url}) | <h3>${name} ([Live Demo](${url}))</h3>${description} |`)
}

console.log('| Live Demo | Description |')
console.log('|--|--|')

for (const app of getAllAppNames()) {
  printAppInfoMarkdown(app);
}
