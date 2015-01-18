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



  var classify = function(node, name) {
    if (node.length) {
      node = Array.prototype.slice.call(node, 0);
      node.forEach(function(elem) {
        elem.classList.add(name);
      });
    } else {
      node.classList.add(name);
    }
  };

  var buildAnchor = function(anchorSpec) {
    var a = document.createElement('a');
    a.href = anchorSpec.url;
    a.text = anchorSpec.label;

    return a;
  };

  var buildListItem = function(listSpec, primary) {
    var li = document.createElement('li');
    li.appendChild(buildAnchor(listSpec));
    if (primary) {
      li.classList.add('primary-item');
    }

    return li;
  };

  var buildList = function(listItems) {
    var ul = document.createElement('ul');
    listItems.forEach(function(item) {
      var li;
      if (item.items && item.items.length > 0) {
        li = buildListItem(item, true);
        li.appendChild(buildList(item.items));
      } else {
        li = buildListItem(item, false);
      }

      ul.appendChild(li);
    });

    return ul;
  };

  var buildNavBar = function(navBarSpec) {
    var navBar = document.createElement('nav');
    navBar.appendChild(buildList(navBarSpec.items));
    navBar.classList.add('navbar', 'navbar-close');
    classify(navBar.querySelector('ul'), 'primary-nav');
    classify(navBar.querySelectorAll('li > ul'), 'secondary-nav');

    return navBar;
  };





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


  document.addEventListener("DOMContentLoaded", function() {
    ajax('/api/nav.json', function(navBarSpec) {
      var navBar = buildNavBar(navBarSpec),
          body = document.querySelector('body');
      body.insertBefore(navBar, body.firstChild);

      toggleMenu();
      dropMenu();
    });
  });

}());


