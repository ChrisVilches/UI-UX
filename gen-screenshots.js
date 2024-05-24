const puppeteer = require('puppeteer')
const { appUrl, getAllAppNames } = require('./util')
const { setTimeout } = require('node:timers/promises')
const fs = require('fs-extra')

const OUTPUT_DIR = 'screenshots'

async function main () {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const allApps = getAllAppNames()

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
  }

  for (const app of allApps) {
    await page.goto(appUrl(app))
    await page.setViewport({ width: 1080, height: 1024 })
    await setTimeout(2000)
    await page.screenshot({ path: `screenshots/${app}.jpg`, type: 'jpeg' })
  }
  await browser.close()
}

main().catch(console.error)
