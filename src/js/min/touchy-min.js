

var showAlert = function() {
  alert("This shit is working");

}

var toggleMenu = function() {
  var ham = document.querySelector('.hamburger');
  console.log(ham);
  ham.onclick(showAlert());
}

