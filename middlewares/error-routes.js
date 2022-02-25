const NotFoundError = require('../errors/not-found-error');

const errorRoutes = (req, res, next) => {
  next(new NotFoundError('Запрошен не существующий роут.'));
};

module.exports = errorRoutes;
