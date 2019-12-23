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


function noScroll() {
  window.scrollTo(0, 0);
}


hamburger.addEventListener('click', function () {
  fullScreenMenu.style.display = 'flex';
  increaseOpacity();
  window.addEventListener('scroll', noScroll);


})

closeMenu.addEventListener('click', function () {
  fullScreenMenu.style.display = 'none';
  window.removeEventListener('scroll', noScroll);
  decreaseOpacity();
})


fullScreenMenu.addEventListener('click', function (event) {
  if (event.target === fullScreenMenu) {
    closeMenu.click();
    window.removeEventListener('scroll', noScroll);
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
    // debugger;

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
const closeMenuAccord = document.querySelectorAll('.menu-accordeon__close');
const menuAccordeon = document.querySelectorAll('.menu-accordeon__trigger');
const activeClassMenu = 'menu-accordeon__trigger--active';

menuAccordeon.forEach(function (section) {
  section.addEventListener('click', function () {

    if (section.classList.contains(activeClassMenu)) {
      section.classList.remove(activeClassMenu)

    } else {

      menuAccordeon.forEach(function (section) {
        section.classList.remove(activeClassMenu)
      })
      section.classList.add(activeClassMenu)

    }


    for (let i = 0; i < closeMenuAccord.length; i++) {
      closeMenuAccord[i].addEventListener('click', function (c) {
        // debugger;
        c.preventDefault();

        if (section.classList.contains(activeClassMenu)) {
          section.classList.remove(activeClassMenu)
        }

      });

    }


  })

})



// =======================================================

// Reviews=========================


const reviewLink = document.querySelectorAll(".reviews__link");

reviewLink.forEach(element =>
  element.addEventListener("click", function (e) {
    e.preventDefault();
  })
);

/* Индекс слайда по умолчанию */
var slideIndex = 1;
showSlides(slideIndex);

/* Функция увеличивает индекс на 1, показывает следующй слайд*/
function plusSlide() {
  showSlides(slideIndex += 1);
}

/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
function minusSlide() {
  showSlides(slideIndex -= 1);
}

/* Устанавливает текущий слайд */
function currentSlide(n) {
  showSlides(slideIndex = n);
}

/* Основная функция слайдера */
function showSlides(n) {

  var i;
  var slides = document.getElementsByClassName("reviews__content");
  var dots = document.getElementsByClassName("reviews__link");
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" reviews__link--active", "");
  }
  slides[slideIndex - 1].style.display = "flex";

  dots[slideIndex - 1].className += " reviews__link--active";
}






// Form

const openModal = document.querySelector('.modal');
const textModal = document.querySelector('.modal__text');

const closeModal = document.querySelector('.btn__link--modal');



closeModal.addEventListener('click', function (e) {
  // debugger;
  e.preventDefault();
  openModal.style.display = 'none';
});


const myForm = document.querySelector('.form__tag');
const sendButton = document.querySelector('.form__btn');

sendButton.addEventListener('click', event => {
  event.preventDefault();


  if (validateForm(myForm)) {

    var formData = new FormData();
    formData.append("name", myForm.elements.name.value);
    formData.append("phone", myForm.elements.phone.value);
    formData.append("comment", myForm.elements.comment.value);
    formData.append("to", "mail@mail.com");


    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    // xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail/fail');

    xhr.send(formData);
    xhr.addEventListener('load', () => {
      if (xhr.response.status) {
        console.log("Все ок!");
        // debugger;
        openModal.style.display = 'flex';

        // window.addEventListener('scroll', noScroll); 
      } else {
        console.log("Не отправлено!");
        openModal.style.display = 'flex';
        textModal.textContent = "Сообщение не отправлено";

      }

    });

  }

});


function validateForm(form) {
  let valid = true;

  if (!validateField(form.elements.name)) {
    valid = false;
  }

  if (!validateField(form.elements.phone)) {
    valid = false;
  }

  if (!validateField(form.elements.comment)) {
    valid = false;
  }

  return valid;
}


function validateField(field) {
  if (!field.checkValidity()) {
    field.nextElementSibling.textContent = field.validationMessage;
    return false;

  } else {

    field.nextElementSibling.textContent = " ";
    return true;
  }
}


//=============================

// One Page Scroll ================

const sections = $('.section');
const display = $('.wrapper__content');
let inScroll = false;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

const performTransition = sectionEq => {

  if (inScroll == false) {
    inScroll = true;

    const position = sectionEq * -100;

    if (isNaN(position)) {
      console.error("передано не верное значение в performTransition")
    }


    sections
      .eq(sectionEq)
      .addClass('active')
      .siblings()
      .removeClass('active');

    display.css({
      transform: `translateY(${position}%)`
    })

    setTimeout(() => {
      inScroll = false;

      $('.fixed-menu__item')
        .eq(sectionEq)
        .addClass('active')
        .siblings()
        .removeClass('active');

    }, 1300);

  }

}


const scrollToSection = direction => {
  const activeSection = sections.filter('.active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction == 'next' && nextSection.length) {
    performTransition(nextSection.index())
  }

  if (direction == 'prev' && prevSection.length) {
    performTransition(prevSection.index())
  }

}




$(window).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;


  if (deltaY > 0) {
    scrollToSection('next');
    // console.log('next');
  }

  if (deltaY < 0) {
    scrollToSection('prev');
    // console.log('prev');
  }


});

$(window).on('keydown', e => {
  const tagName = e.target.tagName.toLowerCase();

  if (tagName !== 'input' && tagName !== 'textarea') {

    switch (e.keyCode) {
      case 38:
        scrollToSection('prev');
        break;

      case 40:
        scrollToSection('next');
        break;
    }

  }


});


$("[data-scroll-to]").on("click", e => {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');

  performTransition(target);

});



if (isMobile) {

  $("body").swipe({
    //Generic swipe handler for all directions
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
      const scrollDirections = direction == 'up' ? 'next' : 'prev';

      scrollToSection(scrollDirections);

    }
  });

}



// Map ============================

ymaps.ready(init);


function init() {
  var map = new ymaps.Map('map', {
    center: [59.94, 30.32],
    center: [55.75, 37.59],
    zoom: 14,
    controls: ['zoomControl'],
    behaviors: ['drag']
  });

  var placemark = new ymaps.Placemark([55.746, 37.581], {
    hintContent: 'Батончики',
    balloonContent: 'Смоленская улица, 6'

  },

    {
      iconLayout: 'default#image',
      iconImageHref: './img/location/mark.png',
      iconImageSize: [46, 57],
      iconImageOffset: [-23, -57]

    });

  var placemark1 = new ymaps.Placemark([55.758, 37.583], {
    hintContent: 'Батончики',
    balloonContent: 'Новинский бульвар, 31'

  },

    {
      iconLayout: 'default#image',
      iconImageHref: './img/location/mark.png',
      iconImageSize: [46, 57],
      iconImageOffset: [-23, -57]

    });

  var placemark2 = new ymaps.Placemark([55.750, 37.604], {
    hintContent: 'Батончики',
    balloonContent: 'улица Знаменка, 19'
  },

    {
      iconLayout: 'default#image',
      iconImageHref: './img/location/mark.png',
      iconImageSize: [46, 57],
      iconImageOffset: [-23, -57]

    });

  var placemark3 = new ymaps.Placemark([55.7579, 37.6224], {
    hintContent: 'Батончики',
    balloonContent: 'Театральный проезд, 2'
  },

    {
      iconLayout: 'default#image',
      iconImageHref: './img/location/mark.png',
      iconImageSize: [46, 57],
      iconImageOffset: [-23, -57]

    });

  map.geoObjects.add(placemark);
  map.geoObjects.add(placemark1);
  map.geoObjects.add(placemark2);
  map.geoObjects.add(placemark3);
}

// ==============


// Player


const wrapPlayer = document.querySelector('.player__wrapper');

const playVideo = document.querySelector('.player__start');
const playVideoIcon = document.querySelector('.player__splash');

const video = document.querySelector('.player__video');

playVideo.addEventListener('click', function () {
  if (wrapPlayer.classList.contains('active')) {
    wrapPlayer.classList.remove('active');
    playVideo.classList.remove('paused');
    video.pause();

  } else {
    wrapPlayer.classList.add('active');
    playVideo.classList.add('paused');
    video.play();

  }

  if (typeof interval !== "undefined") {
    clearInterval(interval);
  }

  var interval = setInterval(() => {
    const durationSec = video.duration;
    const completedSec = video.currentTime;
    const completedPercent = (completedSec / durationSec) * 100;

    $(".player__playback-button").css({
      left: `${completedPercent}%`
    });

  }, 1000);



  $(".player__playback").on("click", e => {
    const bar = $(e.currentTarget);
    const newButtonPosition = e.pageX - bar.offset().left;
    const buttonPosPercent = (newButtonPosition / bar.width()) * 100;
    const newPlayerTimeSec = (video.duration / 100) * buttonPosPercent;


    $(".player__playback-button").css({
      left: `${buttonPosPercent}%`
    });

    video.seeked(newPlayerTimeSec);

  });



})







// $(".player__playback").on("click", e => {
//   const bar = $(e.currentTarget);
//   const newButtonPosition = e.pageX - bar.offset().left;
//   const buttonPosPercent = (newButtonPosition / bar.width()) * 100;
//   const newPlayerTimeSec = (durationSec / 100) * buttonPosPercent;

//   $(".player__playback-button").css({
//     left: `${buttonPosPercent}%`
//   });

// });



playVideoIcon.addEventListener('click', function () {
  playVideo.click();
})




video.addEventListener('click', function (event) {
  if (event.target === video) {

    playVideo.click();
  }
})




// $(".player__playback").on("click", e => {
//   const bar = $(e.currentTarget);
//   const newButtonPosition = e.pageX - bar.offset().left;
//   const buttonPosPercent = (newButtonPosition / bar.width()) * 100;
//   const newPlayerTimeSec = (durationSec / 100) * buttonPosPercent;

//   $(".player__playback-button").css({
//     left: `${buttonPosPercent}%`
//   });

//   player.seekTo(newPlayerTimeSec);
// });


















// const duration = document.querySelector('.player__playback-ratio');
// duration.value = 0;
// duration.min = 0;
// duration.max = video.duration;



// const duration = document.querySelector('.player__playback-button');
// function initDuration() {
//   duration.value = video.currentTime;
// }






// const onPlayerReady = () => {
//   let interval;
//   let durationSec = video.duration;
//   console.log (durationSec);

//   // $(".player__duration-estimate").text(formatTime(durationSec));

//   // if (typeof interval !== "undefined") {
//   //   clearInterval(interval);
//   // }


//   interval = setInterval(() => {
//     const completedSec = video.currentTime;
//     const completedPercent = (completedSec / durationSec) * 100;

//     $(".player__playback-button").css({
//       left: `${completedPercent}%`
//     });

//     // $(".player__duration-completed").text(formatTime(completedSec));
//   }, 1000);
// };























// // Reviews========================= только иконки меняет (не рабочий)


// const reviewsAccordeon = document.querySelectorAll('.reviews__content');
// const activeClassReviews = 'reviews__content--active';

// const reviewsAvatarAcc = document.querySelectorAll('.reviews__link')
// const activeClassAvatar = 'reviews__link--active';

// reviewsAvatarAcc.forEach(function (section) {

//   section.addEventListener('click', function (e) {
//     // debugger;
//     e.preventDefault();

//     reviewsAvatarAcc.forEach(function (section) {
//       section.classList.remove(activeClassAvatar)
//     })

//     section.classList.add(activeClassAvatar)

//   })

// })

