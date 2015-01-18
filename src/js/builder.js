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
