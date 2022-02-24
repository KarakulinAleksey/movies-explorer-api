const router = require('express').Router();
const {
  getCards,
  deleteCard,
  createCard,
  // likeCard,
  // dislikeCard,
} = require('../controllers/cards');
/* const {
  createCardValidator,
  cardIdValidator,
} = require('../validators/celebrate-validators'); */

router.get('/movies', getCards); // переименовать контроллер
router.delete('/movies/:moviesId', /* cardIdValidator, */ deleteCard);
router.post('/movies', /* createCardValidator, */ createCard);
// router.put('/cards/:cardId/likes', /* cardIdValidator, */ likeCard);
// router.delete('/cards/:cardId/likes', /* cardIdValidator, */ dislikeCard);

module.exports = router;
