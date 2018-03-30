import PasswordCheckStrategy from '../strategies/passwordcheckstrategy'
import JobExecutorStrategy from '../strategies/jobexecutorstrategy'

module.exports = app => {
  const passwordCheckStrategy = new PasswordCheckStrategy()
  const jobExecutorStrategy =
    new JobExecutorStrategy(app.get('jobDao'))

  app.set('passwordCheckStrategy', passwordCheckStrategy)
  app.set('jobExecutorStrategy', jobExecutorStrategy)
}
