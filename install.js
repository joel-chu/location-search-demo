#!/usr/bin/env node
// run.js - wrap all the sub-cmd into one method call
const { exec, execSync } = require('child_process')
const { join } = require('path')

const cwd = join(__dirname, 'server')

execSync(`npm install`, { cwd })
execSync(`npm install`, { cwd: join(__dirname, 'demo-ui') })

exec(`npm run serve`, { cwd }, function(err, stdout, stderr) {
  if (err) {
    console.error(err)
  }
  if (stderr) {
    console.error(stderr)
  }

  console.log(stdout)
})
