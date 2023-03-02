const pino = require("pino");
const pretty = require('pino-pretty')

const {colorizerFactory} = require('pino-pretty')
const levelColorize = colorizerFactory(true)
const levelPrettifier = (logLevel: any) => `${levelColorize(logLevel)}`

const stream = pretty({
  colorize: true,
  mkdir: true,
  append: true,
  levelFirst: false,
  customPrettifiers: {
    // The argument for this function will be the same
    // string that's at the start of the log-line by default:
    time: (timestamp: any) => `🕰  ${timestamp}`,
    
    // The argument for the level-prettier may vary depending
    // on if the levelKey option is used or not.
    // By default, this will be the same numerics as the Pino default:
    level: levelPrettifier,
    
    // other prettifies can be used for the other keys if needed, for example
    // hostname: hostname => colorGreen(hostname),
    // pid: pid => colorRed(pid),
    // name: name => colorBlue(name),
    // caller: caller => colorCyan(caller)
  }
})

const logger = pino({
  browser: {asObject: true},
}, stream);

export default logger;
