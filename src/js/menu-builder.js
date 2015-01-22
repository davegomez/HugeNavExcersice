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
   * The buildAnchor statement returns a full HTML <a> Element from an object
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
   * The buildListItem statement returns a full HTML <li> Element from an object
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
   * <ul> Element build from an object with the corresponding nested elements.
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
   * The addImageItem statement allows you to insert an HTML <li> Element with
   * an HTML <img> Element inside taking the source and the title, set those
   * values to that image, and finally inserts the element into the given HTML
   * <ul> Element.
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
   * The addSpan statement allows you to insert an HTML <li> Element with an
   * HTML <span> Element inside taking the text content and an optional class
   * name to finally insert them into the given HTML <ul> Element.
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
