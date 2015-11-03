  'use strict';

  /* Global intervals*/
  var alarm_checker;
  var alarm_sound_looper;

  /* Controllers */
  var iot_alarmControllers = angular.module('iot_alarmControllers', []);


  iot_alarmControllers.controller('TimeCtrl', ['$scope', '$interval', '$cookies',
    function ($scope, $interval, $cookies) {

  	      $scope.date = new Date();
  	      $scope.time = $scope.date;
          $scope.set_hour = $cookies.get('iot_alarm_hour');
          $scope.set_minute = $cookies.get('iot_alarm_minute');

  	    $scope.callAtInterval = function() {
         	$scope.time = new Date();
      }

      $interval( function(){ $scope.callAtInterval(); }, 1000);

      //Check alarm
      //Only place the code here.When switching views the interval still excists. As this is the index page controller it is always called on startup.
    }

  ]);

  iot_alarmControllers.controller('NewsCtrl', ['$scope', '$interval',
    function ($scope) {

      }

    ]);


  iot_alarmControllers.controller('WeatherCtrl', ['$scope', '$http', '$interval',
    function ($scope, $http, $interval) {

  var api_key = "ENTER API KEY HERE";
  var latitude = "51.1588687";
  var longitude = "4.4129354";
  var url = 'https://api.forecast.io/forecast/' + api_key + '/' + latitude + ',' + longitude + '?callback=JSON_CALLBACK';

  function getWeather() {
    $http.jsonp(url)
        .success(function (data) {
            $scope.weather = data.daily;
            $scope.weather_now = data.currently;
        })
        .error(function (error) {
          console.log("error fetching weather data");
        });
  }

getWeather();

$interval(getWeather, 300000, 0, true);


  }  ]
  );
