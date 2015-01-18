
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
    event.addEventListener('click', animate, true);
  };

  var showList = function(event) {
    var lists = document.querySelectorAll('.secondary-nav');
    lists = Array.prototype.slice.call(lists, 0);
    lists.forEach(function(elem) {
      elem.classList.remove('show-list');
    });
    event.target.nextSibling.classList.toggle('show-list');
  };

  var dropMenu = function() {
    var items = document.querySelectorAll('.primary-item');
    console.log(items);
    //items = Array.prototype.slice.call(items, 0);
    for (var i = 0, length = items.length; i < length; i++) {
      items[i].addEventListener('click', showList, true);
    }
  };