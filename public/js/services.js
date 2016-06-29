'use strict'


var app = angular.module('myApp')

.service('FlashCard', function($http, $q) {
  this.flashCards = [] ;

  this.getFlashCards = () =>{
    return $http.get(`/api/flashCards`)
      .then(res => {
        return $q.resolve(res.data);
      })
      .catch(err => {
        console.log('err:', err);
      }) 
    };


  this.addFlashCard = itemObj =>{
    return $http.post(`/api/flashCards`, itemObj)
      .then(res => {
        return $q.resolve(res.data);
      })
      .catch(err => {   
        console.log('err:', err);
      })
    };

 this.deleteItem = (ind, item) =>{
    return $http.delete(`/api/flashCards/${item.id}`)
      .then(() => {
        console.log(" in delete");
        return $q.resolve();
      })
      .catch(err => {   
        console.log('err:', err);
      })
    };
});
