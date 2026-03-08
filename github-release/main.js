const os = require('os')

const logPrefix = '[github-release]'
const actionPath = __dirname
const runnerPlatform = os.platform().toLowerCase()
const runnerArchitecture = os.arch().toLowerCase()
const runnerType = `${runnerPlatform}-${runnerArchitecture}`

console.log(`${logPrefix} starting...`)
console.log(`${logPrefix} using action_path        : ${actionPath}`)
console.log(`${logPrefix} using runner_architecture: ${runnerArchitecture}`)
console.log(`${logPrefix} using runner_platform    : ${runnerPlatform}`)
console.log(`${logPrefix} using runner_type        : ${runnerType}`)
