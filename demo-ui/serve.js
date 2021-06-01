// demo-ui/serve.js
// just call the koa server to start before running the dev

const { join } = require('path')
const { execSync } = require('child_process')
const cwd = join(__dirname, '..', 'server')

execSync(`npm run serve`, { cwd })

console.log('Koa server called')
