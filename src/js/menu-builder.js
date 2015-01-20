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
