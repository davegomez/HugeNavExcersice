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