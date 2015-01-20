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




  /**
   *
   * @param node {HTMLElement}
   * @param name {string}
   */
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

  /**
   *
   * @param anchorSpec {object}
   * @returns {HTMLElement}
   */
  var buildAnchor = function(anchorSpec) {
    var a = document.createElement("a");
    a.href = anchorSpec.url;
    a.text = anchorSpec.label;

    return a;
  };

  /**
   *
   * @param listSpec {object}
   * @param primary {boolean}
   * @returns {HTMLElement}
   */
  var buildListItem = function(listSpec, primary) {
    var li = document.createElement("li");
    li.appendChild(buildAnchor(listSpec));
    if (primary) {
      li.classList.add("primary-item");
    }

    return li;
  };

  /**
   *
   * @param listItems {object}
   * @returns {HTMLElement}
   */
  var buildList = function(listItems) {
    var ul = document.createElement("ul");
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

  var addCopyright = function(list) {
    var span = document.createElement("span"),
        li = document.createElement("li");
    span.textContent = "© 2014 Huge. All Rights Reserved.";
    li.appendChild(span);
    li.classList.add("copyright");
    list.appendChild(li);
  };

  var buildNavBar = function(navBarSpec) {
    var list = buildList(navBarSpec.items);
    addCopyright(list);
    menuCache = list;
    navBar.appendChild(list);
    navBar.classList.add("navbar", "navbar-close");
    classify(navBar.querySelector("ul"), "primary-nav");
    classify(navBar.querySelectorAll("li > ul"), "secondary-nav");
  };

  var initNavBar = function(navBarSpec) {
    buildNavBar(navBarSpec);
    body.insertBefore(navBar, body.firstChild);
    initDropDownMenu();
  };


  var resetMenu = function() {
    document.querySelector(".off").classList.remove("off");
    document.querySelector(".show-list").classList.remove("show-list");
  };

  var animate = function(event) {
    var logo = document.querySelector("img:first-child"),
        offClass = document.querySelector(".off");
    event.target.classList.toggle("hamburger-active");
    body.classList.toggle("lock");
    content.classList.toggle("overlay");
    content.classList.toggle("push-toright");
    logo.classList.toggle("show-logo");
    navBar.classList.toggle("navbar-open");
    navBar.classList.toggle("unlock");
    menuOpen = !!body.classList.contains("lock");
    if (offClass) {
      resetMenu();
    }
  };


  var hideCurrentSubmenu = function(sibling) {
    if (currentActiveSubmenu && currentActiveSubmenu !== sibling) {
      currentActiveSubmenu.classList.remove("show-list");
      event.path[1].classList.remove("off");
    }
  };

  var fixCopyrightPosition = function(height) {
    var copyright = document.querySelector(".copyright");
    if (height < 300 && height !== 0) {
      height = 230 - height + "px";
      copyright.style.top = height;
    } else if (height > 300) {
      copyright.style.top = "0px";
    } else {
      copyright.style.top = "230px";
    }
  };

  var showList = function(event) {
    var link = event.target.querySelector("a"),
        nextSibling = event.target.nextSibling;
    if (event.target.tagName === "LI") {
      event.preventDefault();
      link.click();
      return;
    }
    if (nextSibling) {
      hideCurrentSubmenu(nextSibling);
      nextSibling.classList.toggle("show-list");
      fixCopyrightPosition(nextSibling.scrollHeight);
      event.path[1].classList.toggle("off");
      currentActiveSubmenu = nextSibling;
    }
  };

  var toggleMenu = function(event) {
    if (menuOpen) {
      var menuButton = document.getElementById("toggle");
      menuButton.click();
    }
    menuOpen = false;
  };

  var initDropDownMenu = function() {
    var menuButton = document.getElementById("toggle"),
        mainList = document.querySelector(".primary-nav");

    menuButton.addEventListener("click", animate, false);
    content.addEventListener("click", toggleMenu, false);
    mainList.addEventListener("click", showList, false);
  };


  document.addEventListener("DOMContentLoaded", function() {
    getJSON("/api/nav.json", initNavBar);
  });

}());


