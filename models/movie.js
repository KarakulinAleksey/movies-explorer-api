const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    director: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    description: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 300,
    },
    image: {
      type: String,
      validate: [validator.isURL, 'Некорректная ссылка на картинку'],
      required: true,
    },
    trailerLink: {
      type: String,
      validate: [validator.isURL, 'Некорректная ссылка на трейлер фильма'],
      required: true,
    },
    trumbnail: {
      type: String,
      validate: [validator.isURL, 'Некорректная ссылка на трейлер фильма'],
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: { // проверить корректность схемы поля
      type: String,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 300,
    },
    nameEN: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 300,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
