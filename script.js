import Game from "./game.js";

document.addEventListener("DOMContentLoaded", function() {
  var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;
    return dpr / bsr;
  })();

  var root = document.getElementById('root');
  var game = new Game(root, PIXEL_RATIO);

  function onWindowResize() {
    game.onResize();
  }
  window.onresize = onWindowResize;

  game.canvas.addEventListener("mousemove",onMouseMove,false);
  function onMouseMove(event) {
    var mousePosition = {
      x: event.pageX - game.rect.left,
      y: event.pageY - game.rect.top
    }
    game.onMouseMove(mousePosition);
  }

  game.canvas.addEventListener("mousedown",onMouseClick,false);
  function onMouseClick(event) {
    var clickPosition = {
      x: event.pageX - game.rect.left,
      y: event.pageY - game.rect.top
    }
    game.onMouseClick(clickPosition);
  }
  game.start();
});
