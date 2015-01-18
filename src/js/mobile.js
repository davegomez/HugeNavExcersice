
  var animate = function(event) {
    var body = document.querySelector('body'),
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

  var toggleMenu = function() {
    var event = document.getElementById('toggle');
    event.addEventListener('click', animate, false);
  };

  var showList = function(event) {
    event.target.nextSibling.classList.toggle('show-list');
    event.path[1].classList.toggle('off');
    event.target.classList.toggle('off');
  };

  var dropMenu = function() {
    var mainList = document.querySelector('.primary-nav');
    mainList.addEventListener('click', showList, false);
  };