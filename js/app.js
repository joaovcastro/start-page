'use strict';



angular.module('startPage', ['StartPage.controllers', 'StartPage.services', 'ngRoute', 'ngAnimate'])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html',
      contoller: 'homeController'
    })
    .when('/pomodoro', {
      templateUrl : 'templates/pomodoro.html',
      controller: 'pomodoroController'
    })
    .otherwise({redirectTo: '/'});
})
