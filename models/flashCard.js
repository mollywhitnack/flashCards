'use strict';

const mongoose = require('mongoose');

let FlashCardSchema = {
  category: String,
  question: String,
  answer: String
};

let FlashCard = mongoose.model('FlashCard', FlashCardSchema);

module.exports = FlashCard;