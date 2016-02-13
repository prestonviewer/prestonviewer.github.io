var cherryCount = 0;
var lastScrollTime = Date.now();

var cherryClasses = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
var leafClasses = ['l1', 'l2', 'l3', 'l4'];
var maxLeavesCount = 6;

var options = {
  maxCherriesCount: 6,   // максимальное количество вишен за один скролл
  maxLeavesCount: 3,      // максимальное количество листьев за один скролл
  dropInterval: 500,       // интервал скроллинга
  itemsPerGrow: 10,       // количество элементов для поднятия фона
  growHeight: 80,         // высота поднятия фона
  container: $('.dispencer'),
  bg: $('.bg'),

  height: function() {
    return document.body.clientHeight;
  },
  width: function() {
    return document.body.clientWidth;
  }
};

var fallingEndCallback = function() {
  if (cherryCount + 1 > options.itemsPerGrow) {
    cherryCount = Math.abs(cherryCount + 1 - options.itemsPerGrow);

    var bgTop = parseInt(options.bg.css('top')) - options.growHeight;
    if (bgTop <= 0 ) {
      bgTop = 0;
    }
    options.bg.css({ top: bgTop + 'px' });
  } else {
    cherryCount++;
  }
};

var wheelCallback = function(e) {
  var now = Date.now();
  var isScrollingDown = e.deltaY == -1;
  if (now - lastScrollTime > options.dropInterval && isScrollingDown) {
    var bgTop = parseInt(options.bg.css('top'));
    if (bgTop > 0) {
      createCherries($('.dispencer'));
      createLeaves($('.dispencer'));
      lastScrollTime = now;
    } else {
      alert('Ну все.');
    }
  }
};

var resizeCallback = function(e) {
  var sizeBox = { width: document.body.clientWidth, height: document.body.clientHeight };
  options.container.css(sizeBox);
};

var touchCallback = function(e) {
  var currentY = e.originalEvent.touches[0].clientY;
  var now = Date.now();

  if (currentY > lastY && now - lastScrollTime > options.dropInterval) {
    var bgTop = parseInt(options.bg.css('top'));
    if (bgTop > 0) {
      createCherries($('.dispencer'));
      createLeaves($('.dispencer'));
      lastScrollTime = now;
    } else {
      alert('Ну все.');
    }
  }

  lastY = currentY;
};

var readyCallback = function() {
  $('.loader').imagesLoaded(function() {
    $('.loader').fadeOut();
    var sizeBox = { width: document.body.clientWidth, height: document.body.clientHeight };

    options.container.css(sizeBox);
    options.bg.on('transitionend', function(e) {
      if (parseInt($(this).css('top')) == 0) {
        alert('Ended');
      }
    });
    options.bg.css({ top: $('.dispencer').height() + 'px', display: 'block' });
    window.lastY = 0;
  });
};

$('body').mousewheel(wheelCallback);
$(window).resize(resizeCallback);
$(document).bind('touchmove', touchCallback);

$(document).ready(readyCallback);

function createLeaves(el) {
  var classes = randomizeElements(leafClasses, 1, options.maxLeavesCount);
  var leaves = [];
  var windowWidth = options.width();
  var windowHeight = options.height();
  var gut = 10;

  classes.forEach(function(c) {
    leaves.push($('<div class="leaf '+ c +'"></div>'));
    $(el).prepend(leaves);
  });

  var offsetLeft = gut;
  leaves.forEach(function(el) {
    var elW = $(el).width(), elH = $(el).height();
    offsetLeft = random(-gut, windowWidth - gut);
    $(el).css({ left: offsetLeft + 'px', top: windowHeight + 'px' });

    var rotation = randomRotation();
    var duration = getDuration(rotation);

    $(el).addClass(rotation);
    $(el).css({ top: windowHeight + 'px' });

    $(el).on('transitionend', function() {
      $(this).remove();
    });
  });
}

function createCherries(el) {
  var classes = randomizeElements(cherryClasses, 3, options.maxCherriesCount);
  var cherries = [];
  var windowWidth = options.width();
  var windowHeight = options.height();
  var gut = 10;

  classes.forEach(function(c) {
    cherries.push($('<div class="cherry '+ c +'"></div>'));
    $(el).prepend(cherries);
  });

  var offsetLeft = gut;
  cherries.forEach(function(el) {
    var elW = $(el).width(), elH = $(el).height();
    offsetLeft = random(-gut, windowWidth - gut);
    $(el).css({ left: offsetLeft + 'px', top: -elH + 'px' });

    var rotation = randomRotation();
    var duration = getDuration(rotation);

    $(el).addClass(rotation);
    $(el).css({ top: random(windowHeight, windowHeight + elH) + 'px' });

    $(el).on('transitionend', function() {
      $(this).removeClass(rotation);
      $(this).remove();

      fallingEndCallback.apply(this, []);
    });
  });
}

function random(min, max) {
  return min + (max - min) * Math.random();
}

function randomizeElements(source, min, max) {
  var last = source.length - 1;
  var size = random(min, max);
  var classes = [];

  for (var i = 0; i < size; i++) {
    var index = Math.floor(random(0, last));
    classes.push(source[index]);
  }

  return classes;
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

function getDuration(rotation, type) {
  if (rotation == 'slow-rotation') {
    return !type ? 1600 : 2500;
  } else if (rotation == 'medium-rotation') {
    return !type ? 1000 : 2000;
  } else {
    return !type ? 800 : 1500;
  }
}
