function switchElements(toShow, toHide) {
  document.getElementById(toShow).classList.remove("hidden");
  document.getElementById(toHide).classList.add("hidden");
}

function openNav() {
  document.getElementsByTagName("nav")[0].classList.remove("hidden");
  switchElements("navclosebutton", "navopenbutton");
}

function closeNav() {
  document.getElementsByTagName("nav")[0].classList.add("hidden");
  switchElements("navopenbutton", "navclosebutton");
}

window.onresize = setNavbarOffset;
