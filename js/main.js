const hamburger = document.querySelector('.hamburger');
const fullScreenMenu = document.querySelector('.fullscreen-menu');
const closeMenu = document.querySelector('.fullscreen-menu__close');
const menuLink = document.querySelectorAll('.fullscreen-menu__link');




let op = 0.2;

let increaseOpacity = function () {
  setTimeout(function () {
    if (fullScreenMenu.style.opacity < 1) {
      op = op + 0.2;
      fullScreenMenu.style.opacity = op;
      increaseOpacity();
    }
  }, 100);

}

let decreaseOpacity = function () {
  setTimeout(function () {
    if (fullScreenMenu.style.opacity > 1) {
      op = op - 0.2;
      fullScreenMenu.style.opacity = op;
      decreaseOpacity();
    }
  }, 100);

  if (op == 0 || op < 0) {
    fullScreenMenu.style.display = 'none';
  }

}

hamburger.addEventListener('click', function () {
  fullScreenMenu.style.display = 'flex';
  increaseOpacity();
})

closeMenu.addEventListener('click', function () {
  fullScreenMenu.style.display = 'none';
  decreaseOpacity();
})


fullScreenMenu.addEventListener('click', function (event) {
  if (event.target === fullScreenMenu) {
    closeMenu.click();
    decreaseOpacity();
  }
})

for (let i = 0; i < menuLink.length; i++) {
  menuLink[i].addEventListener('click', function () {
    closeMenu.click();
    decreaseOpacity();
  });
}

// Team

const teamAccordeon = document.querySelectorAll('.team-accordeon__trigger');
const activeClassTeam = 'team-accordeon__trigger--active';

teamAccordeon.forEach(function (section) {

  section.addEventListener('click', function () {

    if (section.classList.contains(activeClassTeam)) {
      section.classList.remove(activeClassTeam)

    } else {

      teamAccordeon.forEach(function (section) {
        section.classList.remove(activeClassTeam)
      })

      section.classList.add(activeClassTeam)

    }

  })

})


// Menu

const menuAccordeon = document.querySelectorAll('.menu-accordeon__trigger');
const activeClassMenu = 'menu-accordeon__trigger--active';

menuAccordeon.forEach(function (section) {
  section.addEventListener('click', function () {

    if (section.classList.contains(activeClassMenu)) {
      section.classList.remove(activeClassMenu)

    } else {

      menuAccordeon.forEach(function (section){
        section.classList.remove(activeClassMenu)
      })
      section.classList.add(activeClassMenu)

    }

  })

})








// let closeTeamActive = function () {


// }

// teamAccordeon.addEventListener('click', function(ev){
//   if (ev.target === document.querySelector('.team-accordeon__trigger--active')) {

//     ev.classList.remove('.team-accordeon__trigger--active')
//   }
// }) 




// // Рабочий
// teamAccordeon.forEach(function (section) {

//   section.addEventListener('click', function (e) {

//     teamAccordeon.forEach(function (section) {
//       section.classList.remove('team-accordeon__trigger--active')
//     })

//     e.target.closest('.team-accordeon__trigger').classList.add('team-accordeon__trigger--active');

//   })

// })


// Рабочий
// for (let i=0; i < teamAccordeon.length; i++){
//   teamAccordeon[i].addEventListener('click', function() {

//     this.classList.toggle('team-accordeon__trigger--active');
//     // console.log(this.classList);
//   })
// }