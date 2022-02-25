const ERROR_CODE_400 = 400;

class BadRequesError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_400;
  }
}

module.exports = BadRequesError;
