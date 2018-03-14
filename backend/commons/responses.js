
const STATUS = {
  OK: 'success',
  FAIL: 'error'
}

/**
 * The overall response to be used on all transactions.
 */
class TransactionResponse {
  constructor (status, data, errors) {
    this.status = status
    this.data = data
    this.errors = errors
  }
}

const success = (data) => {
  return new TransactionResponse(STATUS.OK, data)
}

const failed = (errors) => {
  return new TransactionResponse(STATUS.FAIL, null, errors || 'Transaction could not be processed')
}

export { success, failed }

