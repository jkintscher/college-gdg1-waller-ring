$(function() {

  var canvas = $('#canvas'),
      ctx    = canvas[0].getContext('2d'),
      particle;

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width(), canvas.height(), 1, 1);

  ctx.strokeStyle = 'rgba(255,255,255,0.7)';

  for(var i = 0; i < window.particles.length; ++i) {
    particle = window.particles[i];

    ctx.beginPath();
    ctx.moveTo(particle[0].x/2, particle[0].y/2);

    for(var j = 1; j < particle.length; ++j) {
      ctx.lineTo(particle[j].x/2, particle[j].y/2);
    }

    ctx.stroke();
  }

});
