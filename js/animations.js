document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // ==========================================
  // PARALLAX IMAGES & REVEAL ANIMATIONS
  // ==========================================
  
  const gridItems = document.querySelectorAll('.grid-item');
  
  gridItems.forEach((item, index) => {
    // 1. Reveal (Substituindo o antigo AOS)
    gsap.fromTo(item, 
      { 
        opacity: 0, 
        y: 60 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%', // Quando o topo do card cruzar 85% da tela
          toggleActions: 'play none none none' // Anima apenas na entrada
        }
      }
    );

    // 2. Parallax na Imagem de Capa
    const img = item.querySelector('.grid-image img');
    if (img) {
      // O CSS já define scale(1.15) para dar espaço para o movimento
      gsap.fromTo(img, 
        { yPercent: -15 }, 
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }

    // ==========================================
    // 3D HOVER EFFECT (Premium & Smooth via GSAP quickTo)
    // ==========================================
    const cardContent = item.querySelector('.grid-image');
    if (!cardContent) return;

    // Verifica se o dispositivo possui hover fino (exclui celulares touch)
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (isFinePointer) {
      // Criando setters de alta performance
      const xTo = gsap.quickTo(cardContent, "rotationY", { ease: "power3", duration: 0.5 });
      const yTo = gsap.quickTo(cardContent, "rotationX", { ease: "power3", duration: 0.5 });
      const scaleTo = gsap.quickTo(cardContent, "scale", { ease: "power3", duration: 0.5 });

      item.addEventListener('pointermove', (e) => {
        const rect = item.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        // Coordenadas relativas do mouse no card (0 a 1)
        const mouseX = (e.clientX - rect.left) / width;
        const mouseY = (e.clientY - rect.top) / height;
        
        // Mapeia para rotação (ex: -7 a 7 graus)
        const rotateY = (mouseX - 0.5) * 14; 
        const rotateX = (0.5 - mouseY) * 14; 

        xTo(rotateY);
        yTo(rotateX);
        scaleTo(0.96); // Reduz levemente conforme solicitado
      });

      item.addEventListener('pointerleave', () => {
        // Reseta suavemente
        xTo(0);
        yTo(0);
        scaleTo(1);
      });
    }
  });

  // ==========================================
  // HEADER ENTRANCE
  // ==========================================
  gsap.from('.header-logo', {
    y: -50,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out',
    delay: 0.5
  });
});
