import winston from 'winston'

module.exports = app => {
  const logDirectory = app.get('loggerDirectory')

  require('winston-daily-rotate-file')

  const formatter = options => {
    return `${new Date().toLocaleString('en-US', { timeZone: 'UTC' })} - [${options.level.toUpperCase()}] - ${options.message}`
  }

  const rotatingFileTransport = {
    filename: `${app.get('logName')}.log`,
    json: false,
    level: app.get('logLevel'),
    colorize: true,
    showLevel: app.get('logLevel'),
    prepend: true,
    datePattern: 'yyyy-MM-dd-',
    formatter
  }


  const config = winston.config
  const consoleTransport = {
    colorize: true,
    level: app.get('logLevel'),
    showLevel: app.get('logLevel')
  }

  winston
    .add(winston.transports.DailyRotateFile, rotatingFileTransport)

  // override the console
  winston.remove(winston.transports.Console)
  winston.add(winston.transports.Console, consoleTransport)
}
