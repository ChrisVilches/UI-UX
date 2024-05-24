const fs = require('fs-extra')
const { appUrl, getAllAppNames, getRootPackageJson, joinUrl } = require('./util')
const path = require('path')

const IMG_WIDTH = 250

const REPO_URL = getRootPackageJson().repository.url

function printAppInfoMarkdown (app) {
  const packageJsonPath = path.join(app, 'package.json')
  const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

  const name = packageData.name || app
  const description = packageData.description || ''
  const url = appUrl(app)
  const imgSrc = joinUrl(REPO_URL, `/blob/main/screenshots/${app}.jpg?raw=true`)

  console.log(`| [<img src="${imgSrc}" width=${IMG_WIDTH}>](${url}) | <h3>${name} ([Live Demo](${url}))</h3>${description} |`)
}

console.log('| Live Demo | Description |')
console.log('|--|--|')

for (const app of getAllAppNames()) {
  printAppInfoMarkdown(app)
}
