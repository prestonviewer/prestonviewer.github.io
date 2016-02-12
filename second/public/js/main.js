var canvas = document.querySelector('.blur');
var blurImage = document.querySelector('.blur-bg');
var barHeight = 100;

var resizeCanvas = function() {
  var offset = (document.body.clientWidth / 2) - canvas.width / 2;
  canvas.style.left = offset + 'px';
};

document.addEventListener('DOMContentLoaded', function () {
  StackBlur.image(blurImage, canvas, 20, false);

  resizeCanvas();
});

window.addEventListener('scroll', function(e) {
  if (window.pageYOffset <= barHeight) {
    canvas.style.top = window.pageYOffset + 'px';
  }
});

window.addEventListener('resize', resizeCanvas);
