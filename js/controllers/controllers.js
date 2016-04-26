angular.module('StartPage.controllers', [])

// Controller for the Soundcloud widget
.controller('playerController', function($scope) {

  var widget = SC.Widget(document.getElementById('soundcloud_widget'));
  var firstPlay = true;

  widget.bind(SC.Widget.Events.READY, function() {
    widget.bind(SC.Widget.Events.PLAY, function() {
      widget.getSounds(function (list) {
      });
      // get information about currently playing sound
      widget.getCurrentSound(function(currentSound) {
        if (currentSound.publisher_metadata.artist) {
          $scope.artist = currentSound.publisher_metadata.artist;
        } else {
          $scope.artist = "chill";
        }
        if (currentSound.publisher_metadata.release_title) {
          $scope.song = currentSound.publisher_metadata.release_title;
        } else {
          $scope.song = "on soundcloud";
        }
        $scope.url = currentSound.permalink_url;
      });
    });
  });

  // Play song
  $scope.play = function(list) {
    var index;

    if (firstPlay) {
      widget.getSounds(function (list) {
        var list_length = list.length;
        index = Math.floor((Math.random() * list_length) + 1);
        widget.skip(index);
        firstPlay = false;
        widget.play();
      });
    }
    widget.toggle();
  }

  // Jump to next song
  $scope.next = function() {
    widget.getSounds(function (list) {
      var list_length = list.length;
      index = Math.floor((Math.random() * list_length) + 1);
      widget.skip(index);
      firstPlay = false;
      widget.play();
    });
  }

  // Go to previous song
  $scope.previous = function() {
    widget.prev();
  }

})

.controller('weatherController', function($scope, weatherAPIservice){
  $scope.location = [];

  if (navigator.geolocation) {
    // Get Location
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        $scope.position = position;
        // Get weather info
        $scope.weatherInfo = [];
        weatherAPIservice.getInfo(position)
          .success(function (res) {
            $scope.weatherInfo = res;
            $scope.city = $scope.weatherInfo.name;
            $scope.country = $scope.weatherInfo.sys.country;
            $scope.groundLevel = $scope.weatherInfo.main.grnd_level;
            $scope.humidity = $scope.weatherInfo.main.humidity;
            $scope.pressure = $scope.weatherInfo.main.pressure;
            $scope.sea_level = $scope.weatherInfo.main.sea_level;
            $scope.temp = $scope.weatherInfo.main.temp;
            $scope.temp_max = $scope.weatherInfo.main.temp_max;
            $scope.temp_min = $scope.weatherInfo.main.temp_min;
        }).error(function (err){
            console.log("Error: " + err);
        });
      });
    });
  }
})

.controller('dateTimeController', function($scope, $timeout) {
  // Build the date object
  $scope.date = {};
  // Update function
  var updateTime = function() {
    $scope.date.raw = new Date();
    $timeout(updateTime, 1000);
  }
  // Kick off the update function
  updateTime();
})

// Controller for the To Do List
.controller('todoController', function($scope, localStorageService) {
  // Initialize Variables and get Information from localStorage
  $scope.todoList = [];
  if(!localStorageService.isSupported) {
    alert("Your browser doesn't support local storage :/");
  } else {
    $scope.todoList = JSON.parse(localStorage.getItem('todo'));
  }

  // Add tasks to list
  $scope.addToList = function(text){
    if (text) {
      if ($scope.todoList == null)
        $scope.todoList = [{'task' : text}];
      else{
        if ($scope.todoList.length >= 12) {
          alert("Yowza, that's a lot of todo-ing \n Finish some work first");
          return;
        }
        $scope.todoList.push({'task': text});
      }
      $scope.updateList();
    } else
      console.log("Error: task is empty");
    document.getElementById('todoInput').value = ''
  }

  // Remove tasks from list
  $scope.removeFromList = function(givenTask) {
    for (var i = 0; i < $scope.todoList.length; i++) {
        if ($scope.todoList[i].task == givenTask)
          $scope.todoList.splice(i, 1);
    }
    $scope.updateList();
  }

  // Update list after adding or removing tasks
  $scope.updateList = function() {
    localStorage.removeItem('todo');
    localStorage.setItem('todo', JSON.stringify($scope.todoList));
  }

})

.controller('searchController', function($scope, $window) {
    $scope.searchQuery = '0';
    $scope.search = function(query) {
      var newQuery = query.replace(" ", "%20");
      $scope.searchQuery = 'http://www.google.com/search?q=' + newQuery;
      $window.location.href = $scope.searchQuery;
    }
  })
