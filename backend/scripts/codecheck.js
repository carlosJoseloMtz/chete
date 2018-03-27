const Linter = require('eslint').CLIEngine
const path = require('path')
const fs = require('fs')
const colors = require('colors/safe')
// the plugins installed into the instance
const files = require('../plugins')

const linter = new Linter({
  fix: true,

  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module"
  },

  plugins: ['es5'],

  rules: {
    'arrow-parens': 1,
    'prefer-arrow-callback': 1,
    'lines-between-class-members': 2,
    'no-trailing-spaces': 2,
    semi: ['error', 'never'],
    'no-multiple-empty-lines': 2
  },

  useEslintrc: false
})

const printMessage = (msg) => {

  const metaData = `File ${msg.filePath}\nTotal Errors ${msg.errorCount}`

  console.log(colors.cyan(metaData))

  msg.messages.forEach(msg => {
    let color = ''

    switch (msg.severity) {
      case 2:
        color = 'red'
        break
      case 1:
        color = 'yellow'
        break
      case 0:
        color = 'green'
        break
      default:
        color = 'red'
    }

    eval(`console.log(colors.${color}(msg.source))`)
    console.log(colors.cyan(`${msg.message}\nat line ${msg.line}`))
  })

  console.log(colors.white(':::::::::::::::::::::'))
}

linter.executeOnFiles(files).results.forEach(msg => {
  printMessage(msg)
})

