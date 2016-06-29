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

 this.deleteCard = (ind, item) =>{
  console.log("irem: ", item);
    return $http.delete(`/api/flashCards/${item._id}`)
      .then(() => {
        console.log(" in delete");
        return $q.resolve();
      })
      .catch(err => {   
        console.log('err:', err);
      })
    };

    this.updateCard = (ind, item) =>{
      return $http.put(`/api/flashCards/${item._id}`)
      .then(res => {
        console.log(" in update");
        return $q.resolve(res.data);
      })
      .catch(err => {   
        console.log('err:', err);
      })
    };
});
