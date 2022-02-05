$(window).on('load', function () {
   $('.preloader').fadeOut().end().delay(400).fadeOut('slow');
});
$(function () {
   var link = $('.m-menu-link');
   var close = $('.close-menu');
   var menu = $('.m-menu');
   link.on('click', function (event) {
      event.preventDefault();
      menu.toggleClass('m-menu__active');
   });
   close.on('click', function (event) {
      event.preventDefault();
      menu.toggleClass('m-menu__active');
   })
});