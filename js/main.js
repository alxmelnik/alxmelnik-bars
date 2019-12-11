const hamburger = document.querySelector('.hamburger');
const fullScreenMenu = document.querySelector('.fullscreen-menu');
const closeMenu = document.querySelector('.fullscreen-menu__close');
const menuLink = document.querySelectorAll('.fullscreen-menu__link');

let op = 0.2 ;

let increaseOpacity = function() {
  setTimeout( function() {
    if(fullScreenMenu.style.opacity < 1) {
      op = op + 0.2;
      fullScreenMenu.style.opacity = op;
      increaseOpacity();
    }
  }, 100);

}

let decreaseOpacity = function() {
  setTimeout( function() {
    if(fullScreenMenu.style.opacity > 1) {
      op = op - 0.2;
      fullScreenMenu.style.opacity = op;
      decreaseOpacity();
    }
  }, 100);

  if (op == 0 || op < 0) {
    fullScreenMenu.style.display = 'none';
  }

}



hamburger.addEventListener('click', function() {
  fullScreenMenu.style.display = 'flex';
  increaseOpacity();
})

closeMenu.addEventListener('click', function() {
  fullScreenMenu.style.display = 'none';
  decreaseOpacity();
})


fullScreenMenu.addEventListener('click', function(event) {
  if (event.target === fullScreenMenu) {
    closeMenu.click();
    decreaseOpacity();
  }
})


for (let i = 0; i < menuLink.length; i++) {
  menuLink[i].addEventListener('click', function() {
    closeMenu.click();
    decreaseOpacity();
  });
}