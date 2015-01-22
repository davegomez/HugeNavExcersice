(function() {
  "use strict";

  // Declare global variables
  var body = document.body,
      navBar = document.createElement("nav"),
      content = document.querySelector(".content"),
      menuButton = document.getElementById("toggle"),
      indicator = document.createElement('div'),
      menuOpen = false,
      currentActiveSubmenu,
      copyright;

  var getDeviceState = function () {
    console.log(parseInt(window.getComputedStyle(indicator).getPropertyValue('z-index'), 10));
  };
