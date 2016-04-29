angular.module('StartPage.services', [])

.factory('weatherAPIservice', function($http) {

  var weatherAPI = {};
  var APIkey = 'a87df921273fd71f0dd888d4631e3c5c';

  weatherAPI.getInfo = function(position) {
    var request =  'http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude +
         '&lon=' + position.coords.longitude +
         '&appid=' + APIkey + "&units=metric";
    return $http({
      method: 'GET',
      url: request
    });
  }
  return weatherAPI;
})
;
