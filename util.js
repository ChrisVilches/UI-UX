const fs = require('fs-extra')
const path = require('path')

function requireBaseUrlEnv () {
  const baseUrl = process.env.BASE_URL ?? ''

  if (!baseUrl) {
    throw new Error('BASE_URL (env) cannot be empty')
  }

  return baseUrl
}

function isApp (dirPath) {
  return fs.existsSync(path.join(dirPath, 'vite.config.ts'))
}

function getAllAppNames () {
  return fs.readdirSync('.').filter(isApp)
}

function appUrl (appName) {
  return new URL(appName, requireBaseUrlEnv())
}

function getRootPackageJson () {
  return JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
}

function joinUrl (url1, url2) {
  if (url1.endsWith('/')) url1 = url1.substring(0, url1.length - 1)
  if (url2.startsWith('/')) url2 = url2.substring(1)
  return `${url1}/${url2}`
}

module.exports = {
  requireBaseUrlEnv,
  getAllAppNames,
  appUrl,
  getRootPackageJson,
  joinUrl

}
