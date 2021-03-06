const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const BadRequesError = require('../errors/bad-request-error');
const DeleteCardError = require('../errors/delete-card-error');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch((err) => next(err));
};

const deleteMovie = (req, res, next) => {
  const { moviesId } = req.params;

  return Movie.findById(moviesId).orFail()
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        return next(new DeleteCardError('Попытка удалить чужой фильм.'));
      }
      return movie.remove()
        .then(() => res.status(200).send({ message: movie }));
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Фильм по указанному _id не найден.'));
      } else if (err.name === 'CastError') {
        next(new BadRequesError('Переданы некорректные данные при удалении фильма.'));
      } else {
        next(err);
      }
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const { _id } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: _id,
    movieId,
    nameRU,
    nameEN,
  })
    // .then((movie) => res.status(201).send(movie))
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequesError('Переданы некорректные данные при добавлении фильма.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  deleteMovie,
  createMovie,
};
