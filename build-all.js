// TODO: Lint & format
const fs = require('fs-extra');
const path = require('path');
const child_process = require('child_process');
const { requireBaseUrlEnv, getAllAppNames, appUrl } = require('./util');

const OUTPUT_DIR = "dist_all";
const BASE_URL = requireBaseUrlEnv()

console.log(`Base URL: ${BASE_URL}`)

function alreadyInstalled(app) {
  return fs.existsSync(path.join(OUTPUT_DIR, app))
}

async function execute(cmd, args, cwd) {
  const opts = {
    stdio: "inherit",
    shell: true,
    cwd
  }

  return new Promise(resolve => {
    child_process.spawn(cmd, args, opts).on('close', resolve)
  })
}

async function main() {
  const apps = getAllAppNames()
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
  }
  
  for (const app of apps) {
    console.log(`#################### Installing ${app}`);
    
    if (alreadyInstalled(app)) {
      console.log("Skipped (folder exists)");
      continue;
    }
    
    const outDist = path.join(app, 'dist');

    if (fs.existsSync(outDist)) {
      fs.removeSync(outDist)
    }
  
    await execute('npm', ['install'], app)
    const compileResult = await execute('npx', ['tsc'], app)
    
    if (compileResult !== 0) {
      throw new Error(`(${app}) Compilation failed`)
    }

    await execute('npx', ['vite', 'build', `--base=${appUrl(app)}`], app)

    const cpDest = path.join(OUTPUT_DIR, app);
    await fs.cpSync(outDist, cpDest, { recursive: true })
  }
  
  console.log();
  console.log("Clean commands (execute manually):");
  for (const app of apps) {
    console.log(`rm -rf ./${app}/node_modules`);
  }
}

main().catch(console.error)
