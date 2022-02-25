const ERROR_CODE_403 = 403;

class DeleteCardError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_403;
  }
}

module.exports = DeleteCardError;
