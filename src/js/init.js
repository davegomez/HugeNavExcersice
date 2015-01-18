
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
