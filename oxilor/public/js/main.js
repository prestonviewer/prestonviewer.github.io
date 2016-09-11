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
});
