/*eslint-disable */
/*jslint plusplus: true, node: true */
'use strict';

/*
   Solution to JavaScript programming test for Abierto Networks
   Programmer: Meg Prescott
   Completion Date: 2018-04-21
*/

//Global variables
var clickCount, clickCountSpan;
var clickTime, clickTimeSpan;
var elapsed, elapsedSpan;
var button, timer;


//Helper functions
var getPlural = function (val) {
   return (val === 1) ? '' : 's';
};

var formatTime = function (time) {
   var hour, minute, a, date = new Date(time);

   hour = date.getHours();
   minute = date.getMinutes();
   minute = (minute >= 10) ? minute : '0' + minute;
   a = (hour < 12) ? 'am' : 'pm';
   hour = (hour > 12) ? hour - 12 : hour;

   return hour + ':' + minute + ' ' + a;
};

var updateClickCount = function (count) {
   clickCount = count;
   localStorage.setItem('clickCount', count);
   clickCountSpan.innerHTML = count + ' time' + getPlural(count);
};

var updateClickTime = function (time) {
   clickTime = time;
   localStorage.setItem('clickTime', clickTime);
   clickTimeSpan.innerHTML = (time === -1) ? 'never' : 'at ' + formatTime(time);
};

var updateElapsed = function (minutes) {
   elapsed = minutes;

   var output = (minutes === -1)
      ? 'never'
      : elapsed + ' minute' + getPlural(elapsed) + ' ago';

   localStorage.setItem('elapsed', elapsed);
   elapsedSpan.innerHTML = output;
};

var startTimer = function () {
   clearInterval(timer);

   timer = setInterval(function () {
      var minutes = (Date.now() - clickTime) / 1000 / 60;
      updateElapsed(Math.floor(minutes));
   }, 1000);
};

var initialize = function () {
   clickCount = parseInt(localStorage.getItem('clickCount'), 10);
   clickCountSpan = document.getElementById('clickCount');
   clickTime = parseInt(localStorage.getItem('clickTime'), 10);
   clickTimeSpan = document.getElementById('clickTime');
   elapsed = parseInt(localStorage.getItem('elapsed'), 10);
   elapsedSpan = document.getElementById('elapsed');
   button = document.getElementById('button');
   
   if (!clickCount) { clickCount = 0; }
   updateClickCount(clickCount);
   
   if (!clickTime) { clickTime = -1; }
   updateClickTime(clickTime);

   if (!elapsed) { elapsed = -1; }
   updateElapsed(elapsed);
   
   if (elapsed >= 0) { startTimer(); }
};


// Main application: added a reset button for testing purposes
window.onload = function () {
   initialize();

   button.addEventListener('click', function () {
      updateClickCount(++clickCount);
      updateClickTime(Date.now());
      updateElapsed(0);
      startTimer();
   });
};

