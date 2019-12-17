

$(document).ready(function(){
  var slider = $('.slider__box').bxSlider();

  $('#right').on('click', function(e) {
    e.preventDefault();
    slider.goToNextSlide();
  });

  $('#left').on('click', function(e) {
    e.preventDefault();
    slider.goToPrevSlide();
  });


});