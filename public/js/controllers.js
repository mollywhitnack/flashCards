'use strict'

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $stateParams, FlashCard){
  console.log("Mainctrl");
  console.log('$stateParams:', $stateParams);

  $scope.flashCards = [];

  FlashCard.getFlashCards()
  .then(data =>{
    console.log("data: ",data);
    $scope.flashCards = data;
  })
  .catch(err =>{
    console.error("Err: ", err);
  });
  
});

app.controller('myFlashCardsCtrl', function($scope,$stateParams, $http, FlashCard){
  console.log("myFlashCardsCtrl!");

    $scope.addFlashCard = () => {
    FlashCard.addFlashCard($scope.newItem)
    .then(item=>{
      console.log("item to add", item);
      $scope.flashCards.push(item);
      $scope.newItem = {};
    })
    .catch(err=>{
    console.log("error: ", err );
    });
  };

  $scope.DeleteCard = (ind, card) =>{
    FlashCard.deleteCard(ind, card)
    .then(card => {
      //console.log("item to add", item);
      $scope.flashCards.splice(ind,1);
    })
    .catch(err=>{
      console.log("error: ", err );
    });
  }

  $scope.updateCard = (ind, card) =>{
    $scope.updateItem = {};
    console.log("show update field");
    console.log("card.category:", card.category);
    $scope.showUpdate =true;
    $scope.updateItem.category = card.category;
    $scope.updateItem.question = card.question;
    $scope.updateItem.answer = card.answer;
    $scope.passIndex = ind;
    $scope.passCard = card;


  }

  $scope.updateFlashCard = (card, ind) =>{
    FlashCard.updateCard(card, ind)
    .then(card =>{
      console.log("update: ", card.category);
      console.log("ind", ind);
      /*let updatedCard = {
        _id : card._id,
        category: $scope.updateItem.category || card.category,
        question: $scope.updateItem.question || card.question,
        answer: $scope.updateItem.answer || card.answer
      }
      $scope.flashCards.splice(ind,1);
      $scope.flashCards.push(updatedCard)*/
    })
    .catch(err=>{
      console.log("error: ", err );
    });
  }
});


app.controller('quizMeCtrl', function($scope, $stateParams, FlashCard){
  console.log("quizMeCtrl");

  $scope.currCatagories = {};
  $scope.selectedCatagories = [];
  $scope.cardsToShow = [];

  $scope.card_index = 0;
  $scope.card = {};

  $scope.save = function(){
    $scope.showSkip = true;
    console.log("currCatagories:", $scope.currCatagories);
    for(let catagory in $scope.currCatagories){
      if ($scope.currCatagories[catagory] === true){
        $scope.selectedCatagories.push(catagory);
      }
    }
    $scope.cardsToShow = getCardsFromCatagory($scope.selectedCatagories, $scope.flashCards);
    console.log("cards to show:", $scope.cardsToShow);
    console.log("selectedCatagories:", $scope.selectedCatagories);
  };


  $scope.next = function () {
    console.log("next card");
    if ($scope.card_index >= $scope.cardsToShow.length - 1)
      $scope.card_index = 0;
    else 
      $scope.card_index++;
    console.log($scope.cardsToShow.length + '/' + $scope.card_index);
  };

  $scope.answer = function (card, ans){
    $scope.card = card;
    console.log("card: ", card.answer);
    console.log("answer: ", ans);
    if(card.answer === ans){
      console.log("correct anwser");
      swal({   title: "Correct",   text: "nice"});//, $scope.next); //next);
      $scope.next();
    }
    else{
      console.log("incorrect anwser");
      swal({   title: "Incorrect!",   text: `Answer: ${card.answer}`});
      $scope.next();
    }
  }

});

function getCardsFromCatagory(cats, cards){
  var cardsToShow = [];
  for(var j =0; j< cats.length; j++){
    for(var i=0; i< cards.length; i++){
      if(cards[i].category === cats[j]){
        cardsToShow.push(cards[i]);
      }
    }
 }
  return cardsToShow;
}



app.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});



