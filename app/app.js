	'use strict';

	// Declare app level module which depends on views, and components
	angular.module('iot_alarm', [
		'ngRoute',
		'iot_alarmControllers',
		'feeds',
		'ngAudio',
		'ngCookies'
					// 'gapi'
	]).
	filter('fahrenheitToCelcius', [
			function() {
				return function(temperature) {
	 temperature = parseInt(temperature, 10);
						return  Math.round((temperature - 32) * (5.0 / 9.0) );

				};
			}
		]).
		filter('dayOfTheWeek', [
				function() {
					return function timeConverter(timestamp){
					// var	weekdays = ["sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
					var	weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
	  // var a = new Date(UNIX_timestamp * 1000);
	  // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  // var year = a.getFullYear();
	  // var month = months[a.getMonth()];
	  // var date = a.getDate();
	  // var hour = a.getHours();
	  // var min = a.getMinutes();
	  // var sec = a.getSeconds();
	  // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
	  var date = new Date(timestamp * 1000);

	  return weekdays[date.getDay()];
					};
				}
			]).
			filter('weatherIcon', [
					function() {
						return function(name) {
							var web_icon;
	// hail, thunderstorm, or tornado
							switch (name) {
								case "clear-day":
									web_icon = "wi-day-sunny";
									break;
								case "clear-night":
									web_icon = "wi-night-clear";
									break;
								case "rain":
									web_icon = "wi-day-rain";
									break;
								case "snow":
									web_icon = "wi-day-snow";
									break;
								case "sleet":
									web_icon = "wi-day-sleet";
									break;
								case "wind":
									web_icon = "wi-day-windy";
									break;
								case "fog":
									web_icon = "wi-day-fog";
									break;
								case "cloudy":
									web_icon = "wi-day-cloudy";
									break;
								case "partly-cloudy-day":
									web_icon = "wi-day-cloudy-high";
									break;
								case "hail":
									web_icon = "wi-day-hail";
									break;
								case "partly-cloudy-night":
									web_icon = "wi-night-alt-cloudy";
									break;
								case "thunderstorm":
									web_icon = "wi-day-thunderstorm";
									break;
								case "tornado":
									web_icon = "wi-tornado";
									break;
									default:
										web_icon = "wi-day-cloudy";
										break;
							}

							return web_icon;

						};
					}
				]).
	config(['$routeProvider', function($routeProvider) {
		//Paths
		$routeProvider.
		when('/clock', {
			templateUrl: 'page/clock.html',
			controller: 'TimeCtrl'
		}).
		when('/calendar', {
			templateUrl: 'page/calendar.html',
			controller: 'CalendarCtrl'
		}).
		when('/weather', {
			templateUrl: 'page/weather.html',
			controller: 'WeatherCtrl'
		}).
		when('/news', {
			templateUrl: 'page/news.html',
			controller: 'NewsCtrl'
		}).
		when('/music', {
			templateUrl: 'page/music.html',
			controller: 'MusicCtrl'
		})
			.otherwise({redirectTo: '/clock'});
	}],
	['$httpProvider', function($httpProvider) {
		$httpProvider.defaults.useXDomain = true;
	$httpProvider.defaults.withCredentials = true;
	delete $httpProvider.defaults.headers.common["X-Requested-With"];
	$httpProvider.defaults.headers.common["Accept"] = "application/json";
	$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
	    }
	]
	);
