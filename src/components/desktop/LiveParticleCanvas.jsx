import React, { useEffect, useRef } from 'react';

export default function LiveParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for interactive Grab & Bubble effects
    const mouse = {
      x: null,
      y: null,
      radius: 160 // Grab & Bubble interaction radius
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    // Push on Click effect: spawn 3-4 particles on click
    const handleClick = (e) => {
      if (particles.length > 130) return; // Cap to keep 60 FPS
      const spawnCount = 3 + Math.floor(Math.random() * 2);
      for (let i = 0; i < spawnCount; i++) {
        const p = new Particle(e.clientX, e.clientY);
        // Radiate outwards from click
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed;
        particles.push(p);
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    const PARTICLE_COUNT = 90;
    let particles = [];

    const COLOR_PALETTE = [
      { color: '#ffffff', glow: '#ffffff', type: 'white' },
      { color: '#ffffff', glow: '#ffffff', type: 'white' },
      { color: '#ffffff', glow: '#ffffff', type: 'white' },
      { color: '#E95420', glow: '#E95420', type: 'orange' },
      { color: '#00f2fe', glow: '#00f2fe', type: 'cyan' },
    ];

    class Particle {
      constructor(customX, customY) {
        this.x = customX !== undefined ? customX : Math.random() * width;
        this.y = customY !== undefined ? customY : Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.baseRadius = Math.random() * 2 + 1; // 1px to 3px
        this.radius = this.baseRadius;
        this.baseAlpha = 0.6; // Softened particle opacity to 0.6
        this.alpha = this.baseAlpha;

        const theme = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
        this.color = theme.color;
        this.glow = theme.glow;
        this.type = theme.type;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce from boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Interactive Bubble Effect when cursor approaches
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            const factor = (mouse.radius - dist) / mouse.radius;
            // Expand size up to +2px
            this.radius = this.baseRadius + factor * 1.8;
            this.alpha = Math.min(0.85, this.baseAlpha + factor * 0.25);

            // Gentle repellent nudge
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * factor * 0.8;
            this.y -= Math.sin(angle) * factor * 0.8;
          } else {
            // Smoothly return to base
            this.radius += (this.baseRadius - this.radius) * 0.1;
            this.alpha += (this.baseAlpha - this.alpha) * 0.1;
          }
        } else {
          this.radius += (this.baseRadius - this.radius) * 0.1;
          this.alpha += (this.baseAlpha - this.alpha) * 0.1;
        }
      }

      draw() {
        ctx.save();
        ctx.shadowBlur = this.type === 'white' ? 6 : 10;
        ctx.shadowColor = this.glow;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    };

    initParticles();

    // Render connecting neural links with reduced opacity (0.15 - 0.2)
    const connectParticles = () => {
      const maxDistance = 135;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            // Lowered link opacity to 0.18 to ensure subtle background depth
            const opacity = (1 - dist / maxDistance) * 0.18;
            ctx.save();
            ctx.lineWidth = 1.1;
            if (p1.type === 'orange' || p2.type === 'orange') {
              ctx.strokeStyle = `rgba(233, 84, 32, ${opacity * 1.1})`;
              ctx.shadowColor = '#E95420';
              ctx.shadowBlur = 3;
            } else if (p1.type === 'cyan' || p2.type === 'cyan') {
              ctx.strokeStyle = `rgba(0, 242, 254, ${opacity * 1.1})`;
              ctx.shadowColor = '#00f2fe';
              ctx.shadowBlur = 3;
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            }
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }

        // Grab Effect: Draw subtle glowing links from cursor to nearby particles
        if (mouse.x !== null && mouse.y !== null) {
          const p = particles[i];
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            const grabOpacity = (1 - dist / mouse.radius) * 0.3;
            ctx.save();
            ctx.lineWidth = 1.2;
            ctx.strokeStyle = p.type === 'cyan' 
              ? `rgba(0, 242, 254, ${grabOpacity})`
              : `rgba(233, 84, 32, ${grabOpacity})`;
            ctx.shadowColor = p.type === 'cyan' ? '#00f2fe' : '#E95420';
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and connect particles
      for (let particle of particles) {
        particle.update();
        particle.draw();
      }

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
    />
  );
}
