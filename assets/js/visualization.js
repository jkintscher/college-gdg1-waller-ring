// requestAnim shim layer by Paul Irish

(function() {

  var Particle = function(coords) {
    this.start = coords[0].frame;
    this.end = coords[coords.length - 1].frame;

    this.animate = function(ctx, frame) {
      if(frame <= this.start || frame > this.end) {
        return false;
      }

      ctx.beginPath();
      ctx.moveTo(coords[frame - this.start - 1].x/2, coords[frame - this.start - 1].y/2);
      ctx.lineTo(coords[frame - this.start].x/2, coords[frame - this.start].y/2);
      ctx.stroke();
      return true;
    }

    return this;
  };

  $(function() {

    var canvas = $('#canvas'),
        ctx    = canvas[0].getContext('2d'),
        frame  = 1,
        elements = [];

    for(var i = 0; i < window.particles.length; ++i) {
      elements.push(new Particle(window.particles[i]));
    }

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width(), canvas.height());
    /*
      var img = new Image();
      img.onload = function() {
        ctx.drawImage(img, 0, 0, 1920/2, 1080/2);
      }
      img.src = "assets/img/overlay.jpg";
    */

    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 1;

    function render() {
      var rendered = false;
      for(var i = 0; i < elements.length; ++i) {
        if(elements[i].animate(ctx, frame)) {
          rendered = true;
        }
      }
      return rendered;
    }

    setTimeout(function() {
      var animate = setInterval(function() {
        if(!render()) {
          clearInterval(animate);
        }

        frame++;
      }, 42);
    }, 1000);

    return;

    (function animate() {
      var rid = window.requestAnimationFrame(animate);

      if(!render()) {
        cancelAnimationFrame(rid);
      }

      frame++;
    })();
  });

})();
