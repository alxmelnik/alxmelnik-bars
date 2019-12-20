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

const closeModal = document.querySelector('.btn__link--modal');


// openModal.addEventListener('click', function () {
//   openModal.style.display = 'flex';
// })


closeModal.addEventListener('click', function (e) {
  debugger;
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
    xhr.send(formData);
    xhr.addEventListener('load', () => {
      if (xhr.response.status) {
        console.log("Все ок!");
        // debugger;
        openModal.style.display = 'flex';

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





// // Reviews=========================

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

