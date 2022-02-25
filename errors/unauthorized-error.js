const ERROR_CODE_401 = 401;

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_401;
  }
}

module.exports = UnauthorizedError;
