import { execFile } from 'child_process'
import * as LOG from 'winston'

class JobExecutorStrategy {

  constructor (jobDao) {
    this.jobDao = jobDao
  }

  async execute (jobname) {

    let job

    await this.jobDao.findByName(jobname)
      .then(jb => { job = jb })

    execFile('node', [job.executor], (err, stdout) => {
      const execution = {
        status: 'success',
        output: stdout
      }

      if (err) {
        const strError = JSON.stringify(err)
        LOG.error(`Error while trying to execute job ${jobname}`)
        LOG.error(strError)
        LOG.error(stdout)

        execution.output += `\nErrors:\n${strError}`
        execution.status = 'failed'
      }

      // register the execution silently
      this.jobDao.registerExecution(job, execution)
    })
  }

}


export default JobExecutorStrategy
