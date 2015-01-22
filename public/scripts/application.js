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
   * The classify statement add a class name to an HTML element or several if
   * you pass an object with several HTML elements in it such as the ones you
   * get using the querySelectorAll method.
   * @param node {object}
   * @param name {string}
   */
  var classify = function (node, name) {
    if (node.length) {
      var elements = Array.prototype.slice.call(node, 0);
      elements.forEach(function (elem) {
        elem.classList.add(name);
      });
    } else {
      node.classList.add(name);
    }
  };

  /**
   * The buildAnchor statement returns a full HTML "a" Element from an object
   * with the corresponding information.
   * @param anchorSpec {object}
   * @returns {HTMLElement}
   */
  var buildAnchor = function (anchorSpec) {
    var a = document.createElement('a');

    a.text = anchorSpec.label;

    if (anchorSpec.items && anchorSpec.items.length) {
      a.classList.add('chevron');
    } else {
      a.href = anchorSpec.url;
    }

    return a;
  };

  /**
   * The buildListItem statement returns a full HTML "li" Element from an object
   * with the corresponding information and adds the 'primary-item' class name
   * in case you provide a true value as a second parameter.
   * @param listSpec {object}
   * @param primary {boolean}
   * @returns {HTMLElement}
   */
  var buildListItem = function (listSpec, primary) {
    var li = document.createElement('li');

    li.appendChild(buildAnchor(listSpec));

    if (primary) {
      li.classList.add('primary-item');
    }

    return li;
  };

  /**
   * The buildList statement is a recursive function which returns a full HTML
   * <ul" Element build from an object with the corresponding nested elements.
   * @param listItems {object}
   * @returns {HTMLElement}
   */
  var buildList = function (listItems) {
    var ul = document.createElement('ul');

    listItems.forEach(function (item) {
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

  /**
   * The addImageItem statement allows you to insert an HTML "li" Element with
   * an HTML "img" Element inside taking the source and the title, set those
   * values to that image, and finally inserts the element into the given HTML
   * <ul" Element.
   * @param list {HTMLElement}
   * @param source {string}
   * @param title {string}
   */
  var addImageItem = function (list, source, title) {
    var img = document.createElement('img'),
        li = document.createElement('li');

    img.src = source;
    img.title = title;
    li.appendChild(img);
    li.classList.add('logo');
    list.insertBefore(li, list.firstChild);
  };

  /**
   * The addSpan statement allows you to insert an HTML "li" Element with an
   * HTML "span" Element inside taking the text content and an optional class
   * name to finally insert them into the given HTML "ul" Element.
   * @param list {HTMLElement}
   * @param text {string}
   * @param className {string}
   */
  var addSpan = function (list, text, className) {
    var span = document.createElement('span'),
        li = document.createElement('li');

    span.textContent = text;
    li.appendChild(span);
    className && li.classList.add(className);
    list.appendChild(li);
  };

  /**
   * The buildNavBar statement is the main function responsible for build the
   * navigation bar from a given JSON object obtained from a RESTfull petition.
   * @param navBarSpec
   */
  var buildNavBar = function (navBarSpec) {
    var list = buildList(navBarSpec.items);

    addImageItem(list, 'images/huge-logo.svg', 'Huge Inc');
    addSpan(list, '© 2014 Huge. All Rights Reserved.', 'copyright');
    navBar.appendChild(list);
    navBar.classList.add('navbar');
    classify(navBar.querySelector('ul'), 'primary-nav');
    classify(navBar.querySelectorAll('li > ul'), 'secondary-nav');
  };

  // Initializer
  var initNavBar = function (navBarSpec) {
    buildNavBar(navBarSpec);
    body.insertBefore(navBar, body.firstChild);
    initDropDownMenu();
  };


/**
 * The addStyleString statement receives a CSS Stylesheet declaration as a
 * string and inserts an style node into de HTML "head" Element with this
 * declaration inside so the developer may include dinamic stylesheets into the
 * document.
 * @param declaration {string}
 */
  var addStyleString = function (declaration) {
    var styleNode = document.createElement('style');
    styleNode.innerHTML = declaration;
    document.head.appendChild(styleNode);
  };

  /**
   * When the user clic on another dropdown menu or toggle the mobile navigation
   * bar the resetMenu statement makes sure to deactivate all the remaining HTML
   * active nodes.
   */
  var resetMenu = function () {
    var activeElements = Array.prototype.slice.call(document.querySelectorAll('ul .active'), 0);

    activeElements.forEach(function (elem) {
      elem.classList.remove('active');
    });

    copyright.classList.toggle('active');
  };

  /**
   * The animate statement is responsible for animating the navigation bar in
   * and out state on mobile devices.
   * @param event {function}
   */
  var animate = function (event) {
    var activeListItem = document.querySelector('.primary-item.active'),
        logo = document.querySelector('.mobile-bar > img'),
        target = event.target,
        elements = [logo, target, navBar, body, content];

    elements.forEach(function (elem) {
      elem.classList.toggle('active');
    });

    menuOpen = !!body.classList.contains('active');
    if (activeListItem) {
      resetMenu();
    }
  };

  /**
   * The hideCurrentSubmenu statement is in charge of hidding the active submenu
   * on the mobile navigation bar when you hit another submenu or close the
   * navigation bar.
   * @param sibling
   */
  var hideCurrentSubmenu = function (sibling) {
    if (currentActiveSubmenu && currentActiveSubmenu !== sibling) {
      currentActiveSubmenu.classList.remove('active');
      event.path[1].classList.remove('active');
      resetMenu();
    }
  };

  /**
   * When the mobile menu is created, the HTML "li" Element that contains the
   * Copyright statement need to be pushed to the bottom taking in mind the
   * whole height of the canvas.
   */
  var fixCopyrightPosition = function () {
    var navBarHeight = document.querySelector('.navbar').clientHeight,
        listHeight = document.querySelector('.primary-nav').clientHeight,
        top = navBarHeight - (listHeight + copyright.clientHeight + 1),
        cssRule = '\n\tli.copyright { top: ' + top + 'px }' +
            '\n\tli.copyright.active { top: 0 }\n';

    addStyleString(cssRule);
  };

  /**
   * The activeSubmenu statement receives two parameters, one HTML Element
   * corresponding to an HTML "ul" Element and an event to their target as a
   * trigger to active the selected submenu.
   * @param sibling {HTMLElement}
   * @param event {function}
   */
  var activeSubmenu = function (sibling, event) {
    hideCurrentSubmenu(sibling);

    event.target.classList.toggle('active');
    sibling.classList.toggle('active');
    event.path[1].classList.toggle('active');
    currentActiveSubmenu = sibling;
  };

  /**
   * The showSubmenu statement uses the event generated by the HTML "li" or "a"
   * Elements to show the selected submenu to the user. As a fault in my design
   * the statement have to check if the clic was over the HTML "li" Element to
   * recursively send the event to the HTML "a" Element and trigger the event.
   * @param event {function}
   */
  var showSubmenu = function (event) {
    var link = event.target.querySelector('a'),
        nextSibling = event.target.nextSibling;

    // Recursive event delegation from the <li" Element to the <a>
    if (event.target.tagName === 'LI') {
      event.preventDefault();
      link.click();
      return;
    }

    if (nextSibling) {
      copyright.classList.toggle('active');
      activeSubmenu(nextSibling, event);
    }
  };

  /**
   * The toggleMenu statement controls the event triggered by the hamburger menu
   * on mobile devices.
   * @param event {function}
   */
  var toggleMenu = function (event) {
    if (menuOpen) {
      menuButton.click();
    }
    console.log(getDeviceState());
    copyright.classList.contains('active') && copyright.classList.toggle('active');
    menuOpen = false;
  };

  // Initializer
  var initDropDownMenu = function () {
    var mainList = document.querySelector('.primary-nav');

    menuButton.addEventListener('click', animate, false);
    content.addEventListener('click', toggleMenu, false);
    mainList.addEventListener('click', showSubmenu, false);

    copyright = document.querySelector('.copyright');
    fixCopyrightPosition();
  };


  document.addEventListener("DOMContentLoaded", function() {
    getJSON("/api/nav.json", initNavBar);
  });

}());


