const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const BadRequesError = require('../errors/bad-request-error');
const DeleteCardError = require('../errors/delete-card-error');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => next(err));
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  return Card.findById(cardId).orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return next(new DeleteCardError('Попытка удалить чужую карточку.'));
      }
      return Card.findByIdAndDelete(cardId).orFail()
        .then((cardDel) => res.status(200).send(cardDel))
        .catch((err) => {
          if (err.name === 'DocumentNotFoundError') {
            next(new NotFoundError('Карточка по указанному _id не найдена.'));
          } else if (err.name === 'CastError') {
            next(new BadRequesError('Переданы некорректные данные при удалении карточки.'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточка по указанному _id не найдена.'));
      } else if (err.name === 'CastError') {
        next(new BadRequesError('Переданы некорректные данные при удалении карточки.'));
      } else {
        next(err);
      }
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequesError('Переданы некорректные данные при удалении карточки.'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true }).orFail()
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточка по указанному _id не найдена.'));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequesError('Переданы некорректные данные при удалении карточки.'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true }).orFail()
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточка по указанному _id не найдена.'));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequesError('Переданы некорректные данные при удалении карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
