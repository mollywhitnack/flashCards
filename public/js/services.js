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


  this.addFlashCard = (item) =>{
    return $http.post(`/api/flashCards`, item)
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
      //console.log("id to update: ", item._id);
      //console.log(`/api/flashCards/${item._id}`);
      return $http.put(`/api/flashCards/${item._id}`, item)
      .then(res => {
        console.log(" in update service");
        return $q.resolve(res.data);
      })
      .catch(err => {   
        console.log('err:', err);
      })
    };

   /* this.updateFlashCard = (item, ind) =>{
      return $http.put(`/api/flashCards/${item._id}`)
      .then(res => {
        console.log(" in update");
        return $q.resolve(res.data);
      })
      .catch(err => {   
        console.log('err:', err);
      })
    };*/
});
