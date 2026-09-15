// ---------- Global particles + spotlight background (whole site) ----------
(function initGlobalParticles() {
  const canvas = document.getElementById('bg-particles');
  const spot = document.getElementById('bg-spot');
  const ctx = canvas.getContext('2d');

  let w, h, particles;
  const mouse = { x: null, y: null, radius: 160 };

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function initParticles() {
    const count = Math.min(180, Math.floor((w * h) / 9000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.2 + 0.6,
      wander: Math.random() * Math.PI * 2,
    }));
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach(p => {
      p.wander += (Math.random() - 0.5) * 0.3;
      p.vx += Math.cos(p.wander) * 0.02;
      p.vy += Math.sin(p.wander) * 0.02;
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const maxSpeed = 0.7;
      if (speed > maxSpeed) { p.vx = p.vx / speed * maxSpeed; p.vy = p.vy / speed * maxSpeed; }

      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

      let brightness = 0.28;
      if (mouse.x != null) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          brightness = 0.28 + force * 0.6;
          p.x += (dx / dist) * force * 3.5;
          p.y += (dy / dist) * force * 3.5;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(150,240,225,${brightness})`;
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - dist / 110)})`;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY;
    spot.style.setProperty('--x', (e.clientX / w * 100) + '%');
    spot.style.setProperty('--y', (e.clientY / h * 100) + '%');
  });
  window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
  window.addEventListener('resize', () => { resize(); initParticles(); });

  resize(); initParticles(); animate();
})();
