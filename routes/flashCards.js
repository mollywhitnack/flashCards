'use strict'

const express = require('express');

let FlashCard = require('../models/flashCard');

let router = express.Router();


router.get('/', (req, res)=>{
  FlashCard.find({}, (err, flashCards)=>{
    if(err) return res.status(400).send(err);
    res.send(flashCards);
  });
});

router.post('/', (req, res)=>{

  FlashCard.create(req.body, (err, savedDoc)=>{
    res.status(err ? 400 : 200).send(err || savedDoc);
  })
});

router.route('/:id')
  .delete((req, res)=>{
    FlashCard.findByIdAndRemove(req.params.id, err=>{
       res.status(err ? 400 : 200).send(err);
    });
  })
  .get((req, res)=>{
    FlashCard.findById(req.params.id, (err, flashCard)=>{
      res.status(err ? 400 : 200).send(err || flashCard);
    });
  })
  .put((req, res)=>{
    FlashCard.findByIdAndUpdate(req.params.id, req.body, {new: true }, (err, savedDoc) => {
       console.log("savedDoc:",savedDoc );  //is the old doc unless options object set to new
      res.status(err ? 400 : 200).send(err || savedDoc);
    });
  })


router.route('/category/:category')
 .get((req, res)=>{
    FlashCard.find({'category': `${req.params.category}`}, (err, flashCard)=>{
      res.status(err ? 400 : 200).send(err || flashCard);
    });
  });



module.exports = router;





