$(document).ready(function() {
  $('#slider').owlCarousel({
    singleItem: true,
    navigation: false
  });

  var owl = $(".owl-carousel").data('owlCarousel');

  $('.controls .prev').click(function() {
    owl.next();
  });

  $('.controls .next').click(function() {
    owl.prev();
  });
})
