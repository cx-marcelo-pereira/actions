const os = require('os')
const child_process = require('child_process')

function getBinaryPath(actionPath, runnerType) {
  switch (runnerType) {
    case 'linux-x64':
      return `${actionPath}/dist/github-release-linux-amd64`
    case 'linux-arm64':
      return `${actionPath}/dist/github-release-linux-arm64`
    default:
      throw new Error(`Unsupported runner type: ${runnerType}`)
  }
}

const logPrefix = '[github-release]'
const actionPath = __dirname
const runnerPlatform = os.platform().toLowerCase()
const runnerArchitecture = os.arch().toLowerCase()
const runnerType = `${runnerPlatform}-${runnerArchitecture}`
const actionBinary = getBinaryPath(actionPath, runnerType)

console.log(`${logPrefix} starting...`)
console.log(`${logPrefix} using action_path        : ${actionPath}`)
console.log(`${logPrefix} using action_binary      : ${actionBinary}`)
console.log(`${logPrefix} using runner_architecture: ${runnerArchitecture}`)
console.log(`${logPrefix} using runner_platform    : ${runnerPlatform}`)
console.log(`${logPrefix} using runner_type        : ${runnerType}`)

const result = child_process.spawnSync(actionBinary, [], { stdio: 'inherit' })

if (result.error) {
  console.error(`${logPrefix} error: ${result.error}`)
  process.exit(1)
}

if (result.status !== 0) {
  console.error(`${logPrefix} error: exited with code ${result.status}`)
  process.exit(1)
}

console.log(`${logPrefix} success`)
