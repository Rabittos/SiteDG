document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Text Reveals (Premium Fade Up)
  const revealElements = document.querySelectorAll('.gsap-reveal');
  revealElements.forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 5. Counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      gsap.to(counter, {
        innerHTML: target,
        duration: 2.5,
        snap: { innerHTML: 1 },
        ease: "power3.out",
        scrollTrigger: {
          trigger: counter,
          start: "top 90%",
        }
      });
    });

  });

  // 2. Image Parallax (For photos in the About page)
  const parallaxImages = document.querySelectorAll('.parallax-img');
  parallaxImages.forEach((img) => {
    gsap.fromTo(img,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  });

  // 3. Team Cards 3D Magnetic Hover
  const teamCards = document.querySelectorAll('.team-card-premium');
  teamCards.forEach((card) => {
    const cardContent = card.querySelector('.team-card-inner');
    if (!cardContent) return;

    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (isFinePointer) {
      const xTo = gsap.quickTo(cardContent, "rotationY", { ease: "power3", duration: 0.5 });
      const yTo = gsap.quickTo(cardContent, "rotationX", { ease: "power3", duration: 0.5 });
      const scaleTo = gsap.quickTo(cardContent, "scale", { ease: "power3", duration: 0.5 });

      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) / width;
        const mouseY = (e.clientY - rect.top) / height;

        const rotateY = (mouseX - 0.5) * 12;
        const rotateX = (0.5 - mouseY) * 12;

        xTo(rotateY);
        yTo(rotateX);
        scaleTo(0.97);
      });

      card.addEventListener('pointerleave', () => {
        xTo(0);
        yTo(0);
        scaleTo(1);
      });
    }
  });

  // 4. Hero Animation
  gsap.from('.team-hero-logo', {
    y: -50,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out',
    delay: 0.2
  });
});
