'use strict'

const express = require('express');

let router = express.Router();

router.use('/flashCards', require('./flashCards'));

module.exports = router;