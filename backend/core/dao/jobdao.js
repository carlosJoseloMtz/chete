import JobModel from '../models/jobmodel'
import JobExecutionModel from '../models/jobexecutionmodel'
import * as LOG from 'winston'

class JobDao {

  create (job) {
    const nJob = new JobModel(job)
    return nJob.save()
  }

  findByName (name) {
    return JobModel.findOne({ uid: name })
  }

  /**
   * Registers an execution of a job.
   * @param {JobModel} job Job that was executed.
   * @param {JobExecutionModel} execution The final output (status, output).
   */
  registerExecution (job, execution) {
    JobExecutionModel.create(execution, (err, nExec) => {
      if (err || !nExec) {
        LOG.error(
          `Error while trying to register a job execution for job ${job.uid}`)
        LOG.error(JSON.stringify(err))
      } else {
        LOG.debug(`Execution for job ${job.uid} saved in ${nExec._id}`)
      }
    })
  }
}

export default JobDao
