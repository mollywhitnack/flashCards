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

});


app.controller('quizMeCtrl', function($scope, $stateParams, FlashCard){
  console.log("quizMeCtrl");

  $scope.currCatagories = {};
  $scope.selectedCatagories = [];
  $scope.cardsToShow = [];

  $scope.card_index = 0;
  $scope.card = {};

  $scope.save = function(){
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
    if ($scope.card_index >= $scope.flashCards.length - 1)
      $scope.card_index = 0;
    else 
      $scope.card_index++;
    console.log($scope.flashCards.length + '/' + $scope.card_index);
  };

  $scope.answer = function (card, ans){
    $scope.card = card;
    console.log("card: ", card);
    console.log("answer: ", ans);
    if(card.answer === ans){}
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



