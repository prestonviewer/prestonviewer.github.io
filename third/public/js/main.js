var cherryCount = 0;
var lastScrollTime = Date.now();
var rowHeight = 80;

$(document).ready(function() {

});

$('body').mousewheel(function(event) {
  var now = Date.now();
  var isScrollingDown = event.deltaY == -1;;
  if (now - lastScrollTime > 50 && isScrollingDown) {
    if (getNavalenoHeight() - rowHeight < document.body.clientHeight) {
      createCherries($('.dispencer'));
      lastScrollTime = now;
    } else {
      alert('Ну все.');
    }
  }
});

function createCherries(el) {
  var classes = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  var cherries = [];
  var windowWidth = document.body.clientWidth;
  var windowHeight = document.body.clientHeight;
  var gut = 10; //windowWidth * 0.1;

  classes.forEach(function(c) {
    cherries.push($('<div class="cherry '+ c +'"></div>'));
    $(el).prepend(cherries);
  });

  var offsetLeft = gut;
  cherries.forEach(function(el) {
    var elW = $(el).width(), elH = $(el).height();
    offsetLeft = random(gut, windowWidth - gut);

    $(el).css({ left: offsetLeft + 'px', top: -elH + 'px' });

    var rotation = randomRotation();
    var duration = getDuration(rotation);
    var navaleno = getNavalenoHeight();

    $(el).addClass(rotation);
    $(el).animate({ top: random(windowHeight - elH - navaleno, windowHeight - elH / 2 - navaleno) + 'px' }, {
      duration: duration,
      complete: function() {
        $(el).removeClass(rotation);
      }
    });
  });

  cherryCount += cherries.length;
}

function getNavalenoHeight() {
  var inRow = Math.floor(document.body.clientWidth / 100 * 3)
  var navalenoHeight = rowHeight * Math.floor(cherryCount / inRow);

  return navalenoHeight;
}

function random(min, max) {
  return min + (max - min) * Math.random();
}

function randomRotation() {
  var rand = Math.random() * 100;

  if (rand > 66) {
    return 'fast-rotation';
  } else if (rand > 33) {
    return 'medium-rotation';
  } else {
    return 'slow-rotation';
  }
}

function getDuration(rotation) {
  if (rotation == 'slow-rotation') {
    return 1600;
  } else if (rotation == 'medium-rotation') {
    return 1000;
  } else {
    return 800;
  }
}
