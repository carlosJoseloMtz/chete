
const { execFile } = require('child_process')

const child = execFile('node', ['testjob.js'], (err, stdout, stderr) => {

  if (err) {
    console.log('the error itself', err)
  }

  console.log('The standard output thing :v', stdout)

})
