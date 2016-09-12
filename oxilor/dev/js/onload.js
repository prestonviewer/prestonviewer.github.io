$(document).ready(function() {
  $('#toggleWidth').on('click', function() {
    if (!window.fullWidth) {
      $('.container.wrapper').css({ width: '100%' });
      window.fullWidth = true;
    } else {
      $('.container.wrapper').removeAttr('style');
      window.fullWidth = false;
    }
  });

  $('.list-item').hover(function(e) {
    var
      textWidth = $(this).find('.list-item-text').width(),
      textOffsetLeft = $(this).find('.list-item-text').get(0).offsetLeft,
      opsWidth = $(this).find('.list-item-operations').width()
    ;

    if (textWidth + textOffsetLeft + opsWidth > $(this).width()) {
      $(this).find('.list-item-operations').css({
        position: 'absolute',
        top: 0,
        right: 0
      });

      // Patching only once per element
      $(this).off('mouseover mouseout mouseenter mouseleave');
    }
  });
});
