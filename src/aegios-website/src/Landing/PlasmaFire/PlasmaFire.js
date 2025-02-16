import { useEffect, useRef } from "react";
import "./ParticleFire.css";

const ParticleFire = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createParticle = () => {
      const edge = Math.floor(Math.random() * 0); // Randomly pick an edge: 0 = top, 1 = bottom, 2 = left, 3 = right
      let x, y, vx, vy;

      switch (edge) {
        case 0: // Top edge
          x = Math.random() * canvas.width;
          y = 0;
          vx = (Math.random() - 0.5) * 5;
          vy = Math.random() * 0.5 + 1; // Particles move downward from the top
          break;
        case 1: // Bottom edge
          x = Math.random() * canvas.width;
          y = canvas.height;
          vx = (Math.random() - 0.5) * 5;
          vy = -(Math.random() * 0.5 + 1); // Particles move upward from the bottom
          break;
        case 2: // Left edge
          x = 0;
          y = Math.random() * canvas.height;
          vx = Math.random() * 0.5 + 1; // Particles move to the right
          vy = (Math.random() - 0.5) * 5;
          break;
        case 3: // Right edge
          x = canvas.width;
          y = Math.random() * canvas.height;
          vx = -(Math.random() * 0.5 + 1); // Particles move to the left
          vy = (Math.random() - 0.5) * 5;
          break;
        default:
          break;
      }

      return {
        x,
        y,
        vx,
        vy,
        life: Math.random() * 600 + 40,
        opacity: 1,
        color: `rgba(${255}, ${Math.random() * 150 + 50}, 0, 1)`
      };
    };

    let particlesArray = Array.from({ length: 25 }, createParticle);
    let lastParticleTime = Date.now(); // Track the time of last particle addition
    const particleAdditionInterval = 200; // 200ms delay between adding particles (adjust as needed)

    const updateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesArray = particlesArray
        .map((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 1;
          p.opacity = Math.max(p.life / 100, 0);
          return p;
        })
        .filter((p) => p.life > 0);

      // Add new particles more slowly
      if (Date.now() - lastParticleTime > particleAdditionInterval) {
        particlesArray.push(createParticle());
        lastParticleTime = Date.now();
      }

      particlesArray.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      requestAnimationFrame(updateParticles);
    };

    updateParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-fire-canvas" />;
};

export default ParticleFire;
