(function() {
  "use strict";

  var ajax = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4 || xhr.status !== 200) {
        return;
      }
      if (xhr.readyState === 4) {
        callback(JSON.parse(xhr.responseText));
      }
    };

    xhr.open('GET', url);
    xhr.send();
  };