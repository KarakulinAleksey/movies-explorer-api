const router = require('express').Router();
const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');
const {
  createMovieValidator,
  movieIdValidator,
} = require('../validators/celebrate-validators');

router.get('/movies', getMovies);
router.delete('/movies/:moviesId', movieIdValidator, deleteMovie);
router.post('/movies', createMovieValidator, createMovie);

module.exports = router;
