'use strict'

var app = angular.module('myApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('myFlashCards', {url: '/myFlashCards', templateUrl: 'html/myFlashCards.html', controller: 'myFlashCardsCtrl'})
      .state('quizMe', {url: '/quizMe', templateUrl: 'html/quizMe.html', controller: 'quizMeCtrl'})
    
    //user tries to go somewhere we dont have, just send to home
    $urlRouterProvider.otherwise('/');
});
