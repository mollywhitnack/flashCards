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

app.controller('myFlashCardsCtrl', function($scope, $http, FlashCard){
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
});


app.controller('quizMeCtrl', function($scope, $stateParams, FlashCard){
  console.log("quizMeCtrl");

 $scope.currCatagories = {};
 $scope.selectedCatagories = [];
  $scope.save = function(){
    console.log("currCatagories:", $scope.currCatagories);
    for(let catagory in $scope.currCatagories){
      if ($scope.currCatagories[catagory] === true){
        $scope.selectedCatagories.push(catagory);
      }
    }

  console.log("selectedCatagories:", $scope.selectedCatagories);
  };
});



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



