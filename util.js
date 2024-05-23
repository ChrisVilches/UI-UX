// TODO: Lint & format
const fs = require('fs-extra');
const path = require('path');

function requireBaseUrlEnv() {
  const baseUrl = process.env.BASE_URL ?? ''

  if (!baseUrl) {
    throw new Error("BASE_URL (env) cannot be empty");
  }

  return baseUrl
}

function isApp(dirPath) {
  return fs.existsSync(path.join(dirPath, 'vite.config.ts'))
}

function getAllAppNames () {
  return fs.readdirSync('.').filter(isApp)
}

function appUrl(appName) {
  return new URL(appName, requireBaseUrlEnv())
}

module.exports = {
  requireBaseUrlEnv,
  getAllAppNames,
  appUrl
}
