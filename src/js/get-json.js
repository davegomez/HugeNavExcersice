(function() {
  "use strict";

  var body = document.body,
      navBar = document.createElement("nav"),
      content = document.querySelector(".content"),
      currentActiveSubmenu,
      menuCache,
      menuOpen = false;

  var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4 || xhr.status !== 200) {
        return;
      }
      if (xhr.readyState === 4) {
        callback(JSON.parse(xhr.responseText));
      }
    };

    xhr.open("GET", url);
    xhr.send();
  };
