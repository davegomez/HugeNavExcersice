
  var animate = function(event) {
    var body = document.body,
        nav = document.querySelector('.navbar'),
        logo = document.querySelector('img:first-child'),
        content = document.querySelector('.content');
    event.target.classList.toggle('hamburger-active');
    body.classList.toggle('lock');
    content.classList.toggle('overlay');
    content.classList.toggle('push-toright');
    logo.classList.toggle('show-logo');
    nav.classList.toggle('navbar-open');
    nav.classList.toggle('unlock');
  };

  var showList = function(event) {
    if (event.target.tagName === 'LI') {
      event.preventDefault();
      var link = event.target.querySelector('a');
      link.click();
      return;
    }
    var sibiling = event.target.nextSibling;
    if (sibiling) {
      sibiling.classList.toggle('show-list');
      event.path[1].classList.toggle('off');
      event.target.classList.toggle('off');
    }
  };

  var initDropDownMenu = function() {
    "use strict";
    var event = document.getElementById('toggle');
    var mainList = document.querySelector('.primary-nav');

    event.addEventListener('click', animate, false);
    mainList.addEventListener('click', showList, false);
  }