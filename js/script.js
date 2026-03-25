// =============================================
// UTILITY FUNCTIONS
// =============================================

// Debounce function para otimizar eventos que disparam muitas vezes
const debounce = (func, wait = 20) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function para limitar execuções
const throttle = (func, limit = 16) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Inicializar AOS
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
  });

  // Verificar se há um projeto para abrir ao voltar
  const projectToOpen = sessionStorage.getItem('projectToOpen');
  if (projectToOpen) {
    sessionStorage.removeItem('projectToOpen');
    requestAnimationFrame(() => {
      setTimeout(() => {
        openProject(projectToOpen);
        // Scroll para o card do projeto
        const element = document.getElementById(`project-${projectToOpen}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    });
  }
});

// Dados dos projetos
const projectsData = {
  'fa-house': {
    name: 'F.A House',
    location: 'Minas Gerais',
    year: '2022',
    heroImage: 'img/Projetos/FabricioAndrade/Img-Fabricio1.webp',
    description: 'Curvas que desenham um novo olhar sobre o morar contemporâneo.',
    categories: {
      architecture: {
        title: 'Projeto Arquitetônico',
        description: 'Design moderno e sofisticado',
        categoryImage: 'img/Projetos/FabricioAndrade/Img-Fabricio1.webp',
        details: 'Projeto moderno que equilibra funcionalidade e estética. Design sofisticado com atenção aos detalhes.',
        projectImages: [],
        detailGallery: [
          'img/Projetos/FabricioAndrade/Videos/Anim-Fabricio4.mp4',
          'img/Projetos/FabricioAndrade/Videos/Anim-Fabricio5.mp4',
          'img/Projetos/FabricioAndrade/Videos/Anim-Fabricio6.mp4',
          'img/Projetos/FabricioAndrade/Img-Fabricio11.webp',
          'img/Projetos/FabricioAndrade/Img-Fabricio12.webp',
          'img/Projetos/FabricioAndrade/Img-Fabricio13.webp',
          'img/Projetos/FabricioAndrade/Img-Fabricio2.webp',
          'img/Projetos/FabricioAndrade/Img-Fabricio3.webp',
          'img/Projetos/FabricioAndrade/Img-Fabricio4.webp',
          'img/Projetos/FabricioAndrade/Img-Fabricio5.webp',
          'img/Projetos/FabricioAndrade/Img-Fabricio6.webp',
          'img/Projetos/FabricioAndrade/Img-Fabricio7.webp',
        ]
      },
      interiors: {
        title: 'Interiores',
        description: 'Ambientes refinados e acolhedores',
        categoryImage: 'img/Projetos/FabricioAndrade/Interiores/Img-Fabricio-Int1.webp',
        details: 'Interiores refinados com ambientes acolhedores e elegantes. Design que valoriza conforto e beleza.',
        detailGallery: [
          'img/Projetos/FabricioAndrade/Interiores/Anim-Int-Obra-Fabricio1.mp4',
          'img/Projetos/FabricioAndrade/Videos/Anim-Fabricio2.mp4',
          'img/Projetos/FabricioAndrade/Videos/Anim-Fabricio3.mp4',
          'img/Projetos/FabricioAndrade/Interiores/Img-Fabricio-Int1.webp',
          'img/Projetos/FabricioAndrade/Interiores/Img-Fabricio-Int2.webp',
          'img/Projetos/FabricioAndrade/Interiores/Img-Fabricio-Int3.webp',
          'img/Projetos/FabricioAndrade/Interiores/Img-Fabricio-Int4.webp',
          'img/Projetos/FabricioAndrade/Interiores/Img-Fabricio-Int5.webp',
          'img/Projetos/FabricioAndrade/Interiores/Img-Fabricio-Int9.webp',
          'img/Projetos/FabricioAndrade/Interiores/Img-Fabricio-Int7.webp',
          'img/Projetos/FabricioAndrade/Interiores/Img-Fabricio-Int8.webp',
          'img/Projetos/FabricioAndrade/Interiores/Img-Fabricio-Int6.webp',
          'img/Projetos/FabricioAndrade/Img-Fabricio8.webp',
          'img/Projetos/FabricioAndrade/Img-Fabricio9.webp',
          'img/Projetos/FabricioAndrade/Img-Fabricio10.webp',
        ]
      },
      construction: {
        title: 'Obra',
        description: 'Execução de alta qualidade',
        categoryImage: 'img/Projetos/FabricioAndrade/Obras/Img-Obra-Fabricio1.webp',
        details: 'Construção executada com rigor técnico e alta qualidade. Acompanhamento em todas as etapas.',
        detailGallery: [
          'img/Projetos/FabricioAndrade/Obras/Obra-Fabricio1.mp4',
          'img/Projetos/FabricioAndrade/Obras/Obra-Fabricio2.mp4',
          'img/Projetos/FabricioAndrade/Obras/Obra-Fabricio3.mp4',
          'img/Projetos/FabricioAndrade/Obras/Obra-Fabricio4.mp4',
          'img/Projetos/FabricioAndrade/Obras/Obra-Fabricio5.mp4',
          'img/Projetos/FabricioAndrade/Obras/Obra-Fabricio6.mp4',
        ]
      }
    },
    gallery: [ 
      'img/Projetos/FabricioAndrade/Maquete/Img-Fabricio-Maquete1.webp',
      'img/Projetos/FabricioAndrade/Maquete/Img-Fabricio-Maquete2.webp',
      'img/Projetos/FabricioAndrade/Maquete/Anim-Fabricio-Maquete1.mp4',
      'img/Projetos/FabricioAndrade/Maquete/Anim-Fabricio-Maquete2.mp4',
    ],
    detailGallery: [
      'img/Projetos/FabricioAndrade/Img-Fabricio2.webp',
      'img/Projetos/FabricioAndrade/Img-Fabricio3.webp',
      'img/Projetos/FabricioAndrade/Img-Fabricio4.webp'
    ],
    layoutType: 'horizontal'
  },
  'g.n-house': {
    name: 'G.N House',
    location: 'Minas Gerais',
    year: '2023',
    heroImage: 'img/Projetos/Graciano/IMG/IMG_GRACIANO01.webp',
    description: 'Uma arquitetura ousada que rompe padrões e redefine formas, porções generosas com design horizontal sofisticado.',
    categories: {
      architecture: {
        title: 'Projeto Arquitetônico',
        description: 'Proporções generosas',
        categoryImage: 'img/Projetos/Graciano/IMG/IMG_GRACIANO03.webp',
        details: 'Projeto com proporções generosas que exploram a largura do terreno. Design horizontal sofisticado.',
        projectImages: [],
        detailGallery: [
          'img/Projetos/Graciano/Videos/ANIM_Graciano01.mp4',
          'img/Projetos/Graciano/Videos/ANIM_Graciano02.mp4',
          'img/Projetos/Graciano/Videos/ANIM_Graciano03.mp4',
          'img/Projetos/Graciano/IMG/IMG_GRACIANO01.webp',
          'img/Projetos/Graciano/IMG/IMG_GRACIANO02.webp',
          'img/Projetos/Graciano/IMG/IMG_GRACIANO03.webp',
          'img/Projetos/Graciano/IMG/IMG_GRACIANO04.webp',
          'img/Projetos/Graciano/IMG/IMG_GRACIANO05.webp',
          'img/Projetos/Graciano/IMG/IMG_GRACIANO06.webp',
          'img/Projetos/Graciano/IMG/IMG_GRACIANO07.webp',
          'img/Projetos/Graciano/IMG/IMG_GRACIANO08.webp',
          'img/Projetos/Graciano/IMG/IMG_GRACIANO09.webp',
        ]
      },
      interiors: {
        title: 'Interiores',
        description: 'Espaços amplos e arejados',
        categoryImage: 'img/Projetos/Graciano/Interiores/IMG_INT_Graciano05.webp',
        details: 'Interiores amplos que aproveitam a profundidade do projeto. Espaços integrados e funcionais.',
        detailGallery: [
          'img/Projetos/Graciano/Interiores/IMG_INT_Graciano01.webp',
          'img/Projetos/Graciano/Interiores/IMG_INT_Graciano08.webp',
          'img/Projetos/Graciano/Interiores/IMG_INT_Graciano05.webp',
          'img/Projetos/Graciano/Interiores/IMG_INT_Graciano04.webp',
          'img/Projetos/Graciano/Interiores/IMG_INT_Graciano07.webp',
          'img/Projetos/Graciano/Interiores/IMG_INT_Graciano06.webp',
          'img/Projetos/Graciano/Interiores/IMG_INT_Graciano03.webp',
          'img/Projetos/Graciano/Interiores/IMG_INT_Graciano02.webp',
          'img/Projetos/Graciano/Interiores/IMG_INT_Graciano12.webp',
          'img/Projetos/Graciano/Interiores/IMG_INT_Graciano10.webp',
          'img/Projetos/Graciano/Interiores/IMG_INT_Graciano11.webp',
          'img/Projetos/Graciano/Interiores/IMG_INT_Graciano09.webp',
        ],
        disabled: false,
        disableClick: false,
      },
      construction: {
        title: 'Obra',
        description: 'Construção robusta',
        categoryImage: 'img/Projetos/Graciano/Obras/Img-Obra-Graciano1.webp',
        details: 'Execução que respeita as proporções do projeto e garante qualidade estrutural.',
        detailGallery: [
          'img/Projetos/Graciano/Obras/Obra-Graciano1.mp4',
          'img/Projetos/Graciano/Obras/Obra-Graciano2.mp4',
          'img/Projetos/Graciano/Obras/Obra-Graciano3.mp4'
        ],
        disabled: false,
        disableClick: false,
      }
    },
    gallery: [
      'img/Projetos/Graciano/Maquete/MAQ_Graciano01.webp',
      'img/Projetos/Graciano/Maquete/MAQ_Graciano02.webp',
      'img/Projetos/Graciano/Maquete/MAQ_Graciano03.webp',
      'img/Projetos/Graciano/Maquete/MAQ_Graciano04.webp',
    ],
    detailGallery: [
      'img/Projetos/Francisco-Roseanne/Img-Francisco2.webp',
      'img/Projetos/Francisco-Roseanne/Img-Francisco3.webp',
      'img/Projetos/Francisco-Roseanne/Img-Francisco4.webp',
      'img/Projetos/Francisco-Roseanne/Img-Francisco5.webp'
    ],
    layoutType: 'horizontal'
  },
  'd.r-house': {
    name: 'D.R House',
    location: 'Minas Gerais',
    year: '2023',
    heroImage: 'img/Projetos/Drayce-Rafael/IMG/IMG_Drayce02.webp',
    description: 'Integração perfeita entre luxo, conforto e a paisagem ao redor.',
    categories: {
      architecture: {
        title: 'Projeto Arquitetônico',
        description: 'Elegância contemporânea',
        categoryImage: 'img/Projetos/Drayce-Rafael/IMG/IMG_Drayce01.webp',
        details: 'Projeto que une elegância contemporânea com conforto. Cada detalhe cuidadosamente planejado.',
        projectImages: [
          'img/Projetos/Henrique-Graziele/Img-Henrique1.webp',
          'img/Projetos/Henrique-Graziele/Img-Henrique2.webp',
          'img/Projetos/Henrique-Graziele/Img-Henrique3.webp',
          'img/Projetos/Henrique-Graziele/Img-Henrique4.webp',
          'img/Projetos/Henrique-Graziele/Img-Henrique5.webp',
        ],
        detailGallery: [
          'img/Projetos/Drayce-Rafael/Videos/ANIM_Drayce01.mp4',
          'img/Projetos/Drayce-Rafael/Videos/ANIM_Drayce02.mp4',
          'img/Projetos/Drayce-Rafael/Videos/ANIM_Drayce03.mp4',
          'img/Projetos/Drayce-Rafael/IMG/IMG_Drayce01.webp',
          'img/Projetos/Drayce-Rafael/IMG/IMG_Drayce07.webp',
          'img/Projetos/Drayce-Rafael/IMG/IMG_Drayce03.webp',
          'img/Projetos/Drayce-Rafael/IMG/IMG_Drayce09.webp',
          'img/Projetos/Drayce-Rafael/IMG/IMG_Drayce06.webp',
          'img/Projetos/Drayce-Rafael/IMG/IMG_Drayce02.webp',
          'img/Projetos/Drayce-Rafael/IMG/IMG_Drayce10.webp',
          'img/Projetos/Drayce-Rafael/IMG/IMG_Drayce11.webp',
          'img/Projetos/Drayce-Rafael/IMG/IMG_Drayce12.webp',
        ]
      },
      interiors: {
        title: 'Interiores',
        description: 'Espaços sofisticados',
        categoryImage: 'img/Projetos/Drayce-Rafael/Interiores/IMG_INT_Drayce06.webp',
        details: 'Interiores que refletem sofisticação e bom gosto. Design que transcende tendências.',
        detailGallery: [
          'img/Projetos/Drayce-Rafael/Interiores/IMG_INT_Drayce06.webp',
          'img/Projetos/Drayce-Rafael/Interiores/IMG_INT_Drayce02.webp',
          'img/Projetos/Drayce-Rafael/Interiores/IMG_INT_Drayce07.webp',
          'img/Projetos/Drayce-Rafael/Interiores/IMG_INT_Drayce04.webp',
          'img/Projetos/Drayce-Rafael/Interiores/IMG_INT_Drayce05.webp',
          'img/Projetos/Drayce-Rafael/Interiores/IMG_INT_Drayce08.webp',
          'img/Projetos/Drayce-Rafael/Interiores/IMG_INT_Drayce03.webp',
          'img/Projetos/Drayce-Rafael/Interiores/IMG_INT_Drayce01.webp',
          'img/Projetos/Drayce-Rafael/Interiores/IMG_INT_Drayce09.webp',
          'img/Projetos/Drayce-Rafael/Interiores/IMG_INT_Drayce10.webp',
          'img/Projetos/Drayce-Rafael/Interiores/IMG_INT_Drayce11.webp',
          'img/Projetos/Drayce-Rafael/Interiores/IMG_INT_Drayce12.webp',
        ],
        disabled: false,
        disableClick: false,
      },
      construction: {
        title: 'Obra',
        description: 'Em Breve',
        categoryImage: 'img/Img-EmBreve.webp',
        details: 'Construção com zero defeitos. Qualidade premium em cada etapa da execução.',
        detailGallery: [],
        disabled: true,
        disableClick: true,
      }
    },
    gallery: [ /* IMAGENS MAQUETE AQUI */],
    detailGallery: [],
    layoutType: 'horizontal'
  },
  'm-house': {
    name: 'M. House',
    location: 'Minas Gerais',
    year: '2025',
    heroImage: 'img/Projetos/Michael/Img-Michael7.webp',
    description: 'Minimalismo imponente que valoriza cada detalhe do espaço.',
    categories: {
      architecture: {
        title: 'Projeto Arquitetônico',
        description: 'Design inovador',
        categoryImage: 'img/Projetos/Michael/Img-Michael1.webp',
        details: 'Projeto inovador que redefine padrões. Cada elemento pensado para máxima funcionalidade e beleza.',
        projectImages: [
          'img/Projetos/Michael/Img-Michael1.webp',
          'img/Projetos/Michael/Img-Michael2.webp',
          'img/Projetos/Michael/Img-Michael3.webp',
          'img/Projetos/Michael/Img-Michael4.webp',
          'img/Projetos/Michael/Img-Michael5.webp'
        ],
        detailGallery: [
          'img/Projetos/Michael/Videos/Anim-Michael1.mp4',
          'img/Projetos/Michael/Videos/Anim-Michael2.mp4',
          'img/Projetos/Michael/Videos/Anim-Michael3.mp4',
          'img/Projetos/Michael/Img-Michael2.webp',
          'img/Projetos/Michael/Img-Michael3.webp',
          'img/Projetos/Michael/Img-Michael4.webp',
          'img/Projetos/Michael/Img-Michael5.webp',
          'img/Projetos/Michael/Img-Michael7.webp',
          'img/Projetos/Michael/Img-Michael8.webp',
          'img/Projetos/Michael/Img-Michael11.webp',
          'img/Projetos/Michael/Img-Michael10.webp',
          'img/Projetos/Michael/Img-Michael9.webp',
        ]
      },
      interiors: {
        title: 'Interiores',
        description: 'Em Breve',
        categoryImage: 'img/Img-EmBreve.webp',
        details: 'Interiores que surpreendem com inovação e sofisticação. Design que evolui com novas técnicas.',
        detailGallery: [],
        disabled: true,
        disableClick: true,
      },
      construction: {
        title: 'Obra',
        description: 'Em breve',
        categoryImage: 'img/Img-EmBreve.webp',
        details: 'Execução inovadora com tecnologias modernas e métodos avançados de construção.',
        detailGallery: [
          'img/Projetos/Imagem 10.jpeg',
          'img/Projetos/Imagem 1.jpeg',
          'img/Projetos/Imagem 2.jpeg'
        ],
        disabled: true,
        disableClick: true,
      }
    },
    gallery: [
      'img/Projetos/Michael/Maquete/MAQ_Michael01.webp',
      'img/Projetos/Michael/Maquete/MAQ_Michael02.webp',
      'img/Projetos/Michael/Maquete/MAQ_Michael03.webp',
      'img/Projetos/Michael/Maquete/MAQ_Michael04.webp'
    ],
    detailGallery: [
      'img/Projetos/Michael/Img-Michael2.webp',
      'img/Projetos/Michael/Img-Michael3.webp',
      'img/Projetos/Michael/Img-Michael4.webp',
      'img/Projetos/Michael/Img-Michael5.webp'
    ],
    layoutType: 'horizontal'
  },
  'm.r-house': {
    name: 'M.R House',
    location: 'Minas Gerais',
    year: '2022',
    heroImage: 'img/Projetos/Marcio-Rita/IMG/IMG-Marcio-Rita07.webp',
    description: 'A harmonia perfeita entre ideia, forma e sensação.',
    categories: {
      architecture: {
        title: 'Projeto Arquitetônico',
        description: 'Harmonia e elegância',
        categoryImage: 'img/Projetos/Marcio-Rita/IMG/IMG-Marcio-Rita06.webp',
        details: 'Projeto que busca perfeita harmonia entre forma e função. Design elegante e refinado que respira sofisticação.',
        projectImages: [],
        detailGallery: [
          'img/Projetos/Marcio-Rita/IMG/IMG-Marcio-Rita01.webp',
          'img/Projetos/Marcio-Rita/IMG/IMG-Marcio-Rita02.webp',
          'img/Projetos/Marcio-Rita/IMG/IMG-Marcio-Rita03.webp',
          'img/Projetos/Marcio-Rita/IMG/IMG-Marcio-Rita04.webp',
          'img/Projetos/Marcio-Rita/IMG/IMG-Marcio-Rita05.webp',
          'img/Projetos/Marcio-Rita/IMG/IMG-Marcio-Rita06.webp',
          'img/Projetos/Marcio-Rita/IMG/IMG-Marcio-Rita07.webp',
          'img/Projetos/Marcio-Rita/IMG/IMG-Marcio-Rita08.webp',
          'img/Projetos/Marcio-Rita/IMG/IMG-Marcio-Rita09.webp',
          'img/Projetos/Marcio-Rita/IMG/IMG-Marcio-Rita10.webp',
          'img/Projetos/Marcio-Rita/IMG/IMG-Marcio-Rita11.webp',
          'img/Projetos/Marcio-Rita/IMG/IMG-Marcio-Rita12.webp',
        ]
      },
      interiors: {
        title: 'Interiores',
        description: 'Ambientes harmoniosos',
        categoryImage: 'img/Projetos/Marcio-Rita/IMG/Interiores/IMG_INT_Marcio-Rita06.webp',
        details: 'Interiores que transmitem paz e harmonia. Design que evoca conforto e elegância sem excessos.',
        detailGallery: [
          'img/Projetos/Marcio-Rita/IMG/Interiores/IMG_INT_Marcio-Rita07.webp',
          'img/Projetos/Marcio-Rita/IMG/Interiores/IMG_INT_Marcio-Rita08.webp',
          'img/Projetos/Marcio-Rita/IMG/Interiores/IMG_INT_Marcio-Rita02.webp',
          'img/Projetos/Marcio-Rita/IMG/Interiores/IMG_INT_Marcio-Rita01.webp',
          'img/Projetos/Marcio-Rita/IMG/Interiores/IMG_INT_Marcio-Rita04.webp',
          'img/Projetos/Marcio-Rita/IMG/Interiores/IMG_INT_Marcio-Rita06.webp',
          'img/Projetos/Marcio-Rita/IMG/Interiores/IMG_INT_Marcio-Rita09.webp',
          'img/Projetos/Marcio-Rita/IMG/Interiores/IMG_INT_Marcio-Rita05.webp',
          'img/Projetos/Marcio-Rita/IMG/Interiores/IMG_INT_Marcio-Rita03.webp',
          'img/Projetos/Marcio-Rita/IMG/Interiores/IMG_INT_Marcio-Rita10.webp',
          'img/Projetos/Marcio-Rita/IMG/Interiores/IMG_INT_Marcio-Rita11.webp',
          'img/Projetos/Marcio-Rita/IMG/Interiores/IMG_INT_Marcio-Rita12.webp',
        ],
        disabled: false,
        disableClick: false,
      },
      construction: {
        title: 'Obra',
        description: 'Em Breve',
        categoryImage: 'img/Img-EmBreve.webp',
        details: 'Execução cuidadosa que respeita cada detalhe do projeto. Qualidade e precisão em cada etapa.',
        detailGallery: [
          'img/Projetos/Imagem 10.jpeg',
          'img/Projetos/Imagem 1.jpeg',
          'img/Projetos/Imagem 2.jpeg',
          'img/Projetos/Imagem 3.jpeg'
        ],
        disabled: true,
        disableClick: true,
      }
    },
    gallery: [],
    detailGallery: [],
    layoutType: 'horizontal'
  },
  'adair': {
    name: 'A. House',
    location: 'Contagem • Minas Gerais',
    year: '2025',
    heroImage: 'img/Projetos/Adair/Img-Adair9.webp',
    description: 'Design que ultrapassa o óbvio e se torna experiência.',
    categories: {
      architecture: {
        title: 'Projeto Arquitetônico',
        description: 'Elegância contemporânea',
        categoryImage: 'img/Projetos/Adair/Img-Adair5.webp',
        details: 'Projeto que une elegância com conforto',
        projectImages: [
          'img/Projetos/Rosemary-Valadares/Img-Rosemary1.webp',
          'img/Projetos/Rosemary-Valadares/Img-Rosemary2.webp',
          'img/Projetos/Rosemary-Valadares/Img-Rosemary3.webp'
        ],
        detailGallery: [
          'img/Projetos/Adair/Img-Adair4.webp',
          'img/Projetos/Adair/Img-Adair2.webp',
          'img/Projetos/Adair/Img-Adair3.webp',
          'img/Projetos/Adair/Img-Adair1.webp',
          'img/Projetos/Adair/Img-Adair5.webp',
          'img/Projetos/Adair/Img-Adair6.webp',
          'img/Projetos/Adair/Img-Adair8.webp',
          'img/Projetos/Adair/Img-Adair9.webp',
          'img/Projetos/Adair/Img-Adair10.webp',
          'img/Projetos/Adair/Img-Adair7.webp',
          'img/Projetos/Adair/Img-Adair11.webp',
          'img/Projetos/Adair/Img-Adair12.webp',
        ]
      },
      interiors: {
        title: 'Interiores',
        description: 'Em breve',
        categoryImage: 'img/Img-EmBreve.webp',
        details: 'Interiores em desenvolvimento',
        detailGallery: [],
        disabled: true,
        disableClick: true,
      },
      construction: {
        title: 'Obra',
        description: 'Onde a arquitetura encontra a realidade',
        categoryImage: 'img/Projetos/Adair/Obra/Img-Obra-Adair1.png',
        details: 'Construção com qualidade premium',
        detailGallery: [
          'img/Projetos/Adair/Obra/Anim-Adair-Obra1.mp4',
          'img/Projetos/Adair/Obra/Anim-Adair-Obra2.mp4',
          'img/Projetos/Adair/Obra/Anim-Adair-Obra3.mp4',
        ],
        disabled: false,
        disableClick: false,
      }
    },
    gallery: [ /* IMAGENS DA MAQUETE AQUI */ ],
    detailGallery: [],
    layoutType: 'horizontal'
  },
  'julio-camila': {
    name: 'J.C House',
    location: 'Minas Gerais',
    year: '2024',
    heroImage: 'img/Projetos/Julio-Camila/IMG/IMG_Julio-Camila07.webp',
    description: 'Uma composição pensada para ser sentida além do olhar.',
    categories: {
      architecture: {
        title: 'Projeto Arquitetônico',
        description: 'Design inovador',
        categoryImage: 'img/Projetos/Julio-Camila/IMG/IMG_Julio-Camila04.webp',
        details: 'Projeto inovador que redefine espaços residenciais',
        projectImages: [
          'img/Projetos/Luzia-Fabia/Img-Luzia1.webp',
          'img/Projetos/Luzia-Fabia/Img-Luzia2.webp',
          'img/Projetos/Luzia-Fabia/Img-Luzia3.webp'
        ],
        detailGallery: [
          'img/Projetos/Julio-Camila/IMG/IMG_Julio-Camila01.webp',
          'img/Projetos/Julio-Camila/IMG/IMG_Julio-Camila02.webp',
          'img/Projetos/Julio-Camila/IMG/IMG_Julio-Camila05.webp',
          'img/Projetos/Julio-Camila/IMG/IMG_Julio-Camila03.webp',
          'img/Projetos/Julio-Camila/IMG/IMG_Julio-Camila06.webp',
          'img/Projetos/Julio-Camila/IMG/IMG_Julio-Camila07.webp',
          'img/Projetos/Julio-Camila/IMG/IMG_Julio-Camila08.webp',
          'img/Projetos/Julio-Camila/IMG/IMG_Julio-Camila09.webp',
          'img/Projetos/Julio-Camila/IMG/IMG_Julio-Camila10.webp',
          'img/Projetos/Julio-Camila/IMG/IMG_Julio-Camila11.webp',
          'img/Projetos/Julio-Camila/IMG/IMG_Julio-Camila12.webp',
          'img/Projetos/Julio-Camila/IMG/IMG_Julio-Camila13.webp',
        ]
      },
      interiors: {
        title: 'Interiores',
        description: 'Design que transforma espaços',
        categoryImage: 'img/Projetos/Julio-Camila/Interiores/IMG_INT_Julio-Camila05.webp',
        details: 'Cada espaço conta uma história, o design é quem dá voz a ela.',
        detailGallery: [
          'img/Projetos/Julio-Camila/Interiores/IMG_INT_Julio-Camila04.webp',
          'img/Projetos/Julio-Camila/Interiores/IMG_INT_Julio-Camila09.webp',
          'img/Projetos/Julio-Camila/Interiores/IMG_INT_Julio-Camila07.webp',
          'img/Projetos/Julio-Camila/Interiores/IMG_INT_Julio-Camila01.webp',
          'img/Projetos/Julio-Camila/Interiores/IMG_INT_Julio-Camila02.webp',
          'img/Projetos/Julio-Camila/Interiores/IMG_INT_Julio-Camila03.webp',
          'img/Projetos/Julio-Camila/Interiores/IMG_INT_Julio-Camila08.webp',
          'img/Projetos/Julio-Camila/Interiores/IMG_INT_Julio-Camila05.webp',
          'img/Projetos/Julio-Camila/Interiores/IMG_INT_Julio-Camila06.webp',
          'img/Projetos/Julio-Camila/Interiores/IMG_INT_Julio-Camila10.webp',
          'img/Projetos/Julio-Camila/Interiores/IMG_INT_Julio-Camila11.webp',
          'img/Projetos/Julio-Camila/Interiores/IMG_INT_Julio-Camila12.webp',
        ],
        disabled: false,
        disableClick: false,
      },
      construction: {
        title: 'Obra',
        description: 'Em breve',
        categoryImage: 'img/Img-EmBreve.webp',
        details: 'Construção com qualidade premium',
        detailGallery: [
          'img/Projetos/Imagem 10.jpeg',
          'img/Projetos/Imagem 1.jpeg'
        ],
        disabled: true,
        disableClick: true,
      }
    },
    gallery: [ /*IMAGENS DA MAQUETE AQUI */ ],
    detailGallery: [],
    layoutType: 'horizontal'
  },
  'sandra-cristian': {
    name: 'Casa Passarela',
    location: 'Contagem • Minas Gerais',
    year: '2024',
    heroImage: 'img/Projetos/Sandra-Cristian/Img-Sandra2.webp',
    description: 'Detalhes que se conectam para criar algo maior que o todo.',
    categories: {
      architecture: {
        title: 'Projeto Arquitetônico',
        description: 'Design contemporâneo',
        categoryImage: 'img/Projetos/Sandra-Cristian/Img-Sandra1.webp',
        details: 'Projeto contemporâneo que evoca elegância e modernidade',
        projectImages: [
          'img/Projetos/Sandra-Cristian/Img-Sandra1.webp',
          'img/Projetos/Sandra-Cristian/Img-Sandra2.webp',
          'img/Projetos/Sandra-Cristian/Img-Sandra3.webp'
        ],
        detailGallery: [
          'img/Projetos/Sandra-Cristian/Videos/Anim-Sandra1.mp4',
          'img/Projetos/Sandra-Cristian/Videos/Anim-Sandra2.mp4',
          'img/Projetos/Sandra-Cristian/Videos/Anim-Sandra3.mp4',
          'img/Projetos/Sandra-Cristian/Videos/Anim-Sandra4.mp4',
          'img/Projetos/Sandra-Cristian/Videos/Anim-Sandra5.mp4',
          'img/Projetos/Sandra-Cristian/Videos/Anim-Sandra6.mp4',
          'img/Projetos/Sandra-Cristian/Videos/Anim-Sandra7.mp4',
          'img/Projetos/Sandra-Cristian/Videos/Anim-Sandra8.mp4',
          'img/Projetos/Sandra-Cristian/Videos/Anim-Sandra9.mp4',
          'img/Projetos/Sandra-Cristian/Img-Sandra1.webp',
          'img/Projetos/Sandra-Cristian/Img-Sandra2.webp',
          'img/Projetos/Sandra-Cristian/Img-Sandra3.webp',
          'img/Projetos/Sandra-Cristian/Img-Sandra4.webp',
          'img/Projetos/Sandra-Cristian/Img-Sandra5.webp',
          'img/Projetos/Sandra-Cristian/Img-Sandra6.webp',
          'img/Projetos/Sandra-Cristian/Img-Sandra7.webp',
          'img/Projetos/Sandra-Cristian/Img-Sandra8.webp',
          'img/Projetos/Sandra-Cristian/Img-Sandra9.webp',
        ]
      },
      interiors: {
        title: 'Interiores',
        description: 'Em breve',
        categoryImage: 'img/Img-EmBreve.webp',
        details: 'Interiores em desenvolvimento',
        detailGallery: [],
        disabled: true,
        disableClick: true,
      },
      construction: {
        title: 'Obra',
        description: 'Em breve',
        categoryImage: 'img/Img-EmBreve.webp',
        details: 'Construção com qualidade premium',
        detailGallery: [
          'img/Projetos/Imagem 10.jpeg',
          'img/Projetos/Imagem 1.jpeg'
        ],
        disabled: true,
        disableClick: true,
      }
    },
    gallery: [
      'img/Projetos/Sandra-Cristian/Maquete/MAQ_Sandra01.webp',
      'img/Projetos/Sandra-Cristian/Maquete/MAQ_Sandra02.webp',
      'img/Projetos/Sandra-Cristian/Maquete/MAQ_Sandra03.webp',
      'img/Projetos/Sandra-Cristian/Maquete/MAQ_Sandra04.webp',
    ],
    detailGallery: [],
    layoutType: 'horizontal'
  },
  'renata-gil': {
    name: 'R.G House',
    location: 'Minas Gerais',
    year: '2025',
    heroImage: 'img/Projetos/Renata-Gil/Img-Renata2.webp',
    description: 'A força do conceito traduzida em cada escolha e direção.',
    categories: {
      architecture: {
        title: 'Projeto Arquitetônico',
        description: 'Design contemporâneo',
        categoryImage: 'img/Projetos/Renata-Gil/Img-Renata1.webp',
        details: 'Projeto contemporâneo que une elegância com modernidade',
        projectImages: [
          'img/Projetos/Renata-Gil/Img-Renata1.webp',
          'img/Projetos/Renata-Gil/Img-Renata2.webp',
          'img/Projetos/Renata-Gil/Img-Renata3.webp'
        ],
        detailGallery: [
          'img/Projetos/Renata-Gil/Videos/Anim-Renata1.mp4',
          'img/Projetos/Renata-Gil/Videos/Anim-Renata2.mp4',
          'img/Projetos/Renata-Gil/Videos/Anim-Renata3.mp4',
          'img/Projetos/Renata-Gil/Img-Renata1.webp',
          'img/Projetos/Renata-Gil/Img-Renata2.webp',
          'img/Projetos/Renata-Gil/Img-Renata3.webp',
          'img/Projetos/Renata-Gil/Img-Renata7.webp',
          'img/Projetos/Renata-Gil/Img-Renata8.webp',
          'img/Projetos/Renata-Gil/Img-Renata9.webp',
          'img/Projetos/Renata-Gil/Img-Renata4.webp',
          'img/Projetos/Renata-Gil/Img-Renata5.webp',
          'img/Projetos/Renata-Gil/Img-Renata6.webp',
        ]
      },
      interiors: {
        title: 'Interiores',
        description: 'Em breve',
        categoryImage: 'img/Img-EmBreve.webp',
        details: 'Interiores em desenvolvimento',
        detailGallery: [],
        disabled: true,
        disableClick: true,
      },
      construction: {
        title: 'Obra',
        description: 'Em breve',
        categoryImage: 'img/Img-EmBreve.webp',
        details: 'Construção com qualidade premium',
        detailGallery: [
          'img/Projetos/Imagem 10.jpeg',
          'img/Projetos/Imagem 1.jpeg'
        ],
        disabled: true,
        disableClick: true,
      }
    },
    gallery: [
      'img/Projetos/Renata-Gil/Maquete/MAQ_Renata-Gil01.webp',
      'img/Projetos/Renata-Gil/Maquete/MAQ_Renata-Gil02.webp',
      'img/Projetos/Renata-Gil/Maquete/MAQ_Renata-Gil03.webp',
      'img/Projetos/Renata-Gil/Maquete/MAQ_Renata-Gil04.webp'
    ],
    detailGallery: [],
    layoutType: 'horizontal'
  },

    'cassio-isabella': {
    name: 'C.I House',
    location: 'Contagem • Minas Gerais',
    year: '2025',
    heroImage: 'img/Projetos/Cassio-Isabella/Img-Cassio2.webp',
    description: 'Mais do que um projeto, uma visão construída.',
    categories: {
      architecture: {
        title: 'Projeto Arquitetônico',
        description: 'O essencial, elevado ao extraordinário',
        categoryImage: 'img/Projetos/Cassio-Isabella/Img-Cassio4.webp',
        details: 'onde cada detalhe é pensado com precisão, cada espaço ganha propósito',
        projectImages: [],
        detailGallery: [
          'img/Projetos/Cassio-Isabella/Videos/Anim-Cassio1.mp4',
          'img/Projetos/Cassio-Isabella/Videos/Anim-Cassio2.mp4',
          'img/Projetos/Cassio-Isabella/Videos/Anim-Cassio3.mp4',
          'img/Projetos/Cassio-Isabella/Img-Cassio1.webp',
          'img/Projetos/Cassio-Isabella/Img-Cassio2.webp',
          'img/Projetos/Cassio-Isabella/Img-Cassio3.webp',
          'img/Projetos/Cassio-Isabella/Img-Cassio4.webp',
          'img/Projetos/Cassio-Isabella/Img-Cassio5.webp',
          'img/Projetos/Cassio-Isabella/Img-Cassio8.webp',
          'img/Projetos/Cassio-Isabella/Img-Cassio7.webp',
          'img/Projetos/Cassio-Isabella/Img-Cassio6.webp',
          'img/Projetos/Cassio-Isabella/Img-Cassio9.webp',
        ]
      },
      interiors: {
        title: 'Interiores',
        description: 'Em breve',
        categoryImage: 'img/Img-EmBreve.webp',
        details: 'Interiores em desenvolvimento',
        detailGallery: [],
        disabled: true,
        disableClick: true,
      },
      construction: {
        title: 'Obra',
        description: 'Em breve',
        categoryImage: 'img/Img-EmBreve.webp',
        details: 'Construção com qualidade premium',
        detailGallery: [],
        disabled: true,
        disableClick: true,
      }
    },
    gallery: [ /* MAQUETE AQUI */],
    detailGallery: [],
    layoutType: 'horizontal'
  },

    'adilson': {
    name: 'Edificio Adilson',
    location: 'Contagem • Minas Gerais',
    year: '2026',
    heroImage: 'img/Projetos/Adilson/Img/Img-Adilson5.webp',
    description: 'Presença que transforma o horizonte.',
    categories: {
      architecture: {
        title: 'Projeto Arquitetônico',
        description: 'Um edifício que redefine o cenário urbano com linhas marcantes',
        categoryImage: 'img/Projetos/Adilson/Img/Img-Adilson4.webp',
        details: 'Um edifício onde forma, função e identidade se encontram para transformar o espaço urbano com elegância e propósito',
        projectImages: [],
        detailGallery: [
          'img/Projetos/Adilson/Videos/Anim-Adilson1.mp4',
          'img/Projetos/Adilson/Videos/Anim-Adilson2.mp4',
          'img/Projetos/Adilson/Videos/Anim-Adilson3.mp4',
          'img/Projetos/Adilson/Img/Img-Adilson1.webp',
          'img/Projetos/Adilson/Img/Img-Adilson2.webp',
          'img/Projetos/Adilson/Img/Img-Adilson3.webp',
          'img/Projetos/Adilson/Img/Img-Adilson4.webp',
          'img/Projetos/Adilson/Img/Img-Adilson5.webp',
          'img/Projetos/Adilson/Img/Img-Adilson6.webp',
          'img/Projetos/Adilson/Img/Img-Adilson7.webp',
          'img/Projetos/Adilson/Img/Img-Adilson8.webp',
          'img/Projetos/Adilson/Img/Img-Adilson9.webp',
        ]
      },
      interiors: {
        title: 'Interiores',
        description: 'Em breve',
        categoryImage: 'img/Img-EmBreve.webp',
        details: 'Interiores em desenvolvimento',
        detailGallery: [],
        disabled: true,
        disableClick: true,
      },
      construction: {
        title: 'Obra',
        description: 'Em breve',
        categoryImage: 'img/Img-EmBreve.webp',
        details: 'Construção com qualidade premium',
        detailGallery: [],
        disabled: true,
        disableClick: true,
      }
    },
    gallery: [ /* MAQUETE AQUI */],
    detailGallery: [],
    layoutType: 'vertical'
  },

    'adriano silveira': {
    name: 'A.S House',
    location: 'Contagem • Minas Gerais',
    year: '2023',
    heroImage: 'img/Projetos/Adriano Silveira/Img/Img-Adriano2.webp',
    description: 'Curvas que acolhem.',
    categories: {
      architecture: {
        title: 'Projeto Arquitetônico',
        description: 'Uma casa onde as curvas conduzem o olhar',
        categoryImage: 'img/Projetos/Adriano Silveira/Img/Img-Adriano3.webp',
        details: 'O essencial, elevado ao extraordinário',
        projectImages: [],
        detailGallery: [
          'img/Projetos/Adriano Silveira/Img/Img-Adriano10.webp',
          'img/Projetos/Adriano Silveira/Img/Img-Adriano11.webp',
          'img/Projetos/Adriano Silveira/Img/Img-Adriano12.webp',
          'img/Projetos/Adriano Silveira/Img/Img-Adriano7.webp',
          'img/Projetos/Adriano Silveira/Img/Img-Adriano8.webp',
          'img/Projetos/Adriano Silveira/Img/Img-Adriano9.webp',
          'img/Projetos/Adriano Silveira/Img/Img-Adriano1.webp',
          'img/Projetos/Adriano Silveira/Img/Img-Adriano2.webp',
          'img/Projetos/Adriano Silveira/Img/Img-Adriano3.webp',
          'img/Projetos/Adriano Silveira/Img/Img-Adriano4.webp',
          'img/Projetos/Adriano Silveira/Img/Img-Adriano5.webp',
          'img/Projetos/Adriano Silveira/Img/Img-Adriano6.webp',
        ]
      },
      interiors: {
        title: 'Interiores',
        description: 'Design pensado para viver bem todos os dias',
        categoryImage: 'img/Projetos/Adriano Silveira/Interiores/Int-Adriano15.webp',
        details: 'Conforto em primeiro lugar',
        detailGallery: [
          'img/Projetos/Adriano Silveira/Interiores/Int-Adriano1.webp',
          'img/Projetos/Adriano Silveira/Interiores/Int-Adriano2.webp',
          'img/Projetos/Adriano Silveira/Interiores/Int-Adriano3.webp',
          'img/Projetos/Adriano Silveira/Interiores/Int-Adriano4.webp',
          'img/Projetos/Adriano Silveira/Interiores/Int-Adriano5.webp',
          'img/Projetos/Adriano Silveira/Interiores/Int-Adriano6.webp',
          'img/Projetos/Adriano Silveira/Interiores/Int-Adriano7.webp',
          'img/Projetos/Adriano Silveira/Interiores/Int-Adriano8.webp',
          'img/Projetos/Adriano Silveira/Interiores/Int-Adriano9.webp',
          'img/Projetos/Adriano Silveira/Interiores/Int-Adriano10.webp',
          'img/Projetos/Adriano Silveira/Interiores/Int-Adriano11.webp',
          'img/Projetos/Adriano Silveira/Interiores/Int-Adriano14.webp',
          'img/Projetos/Adriano Silveira/Interiores/Int-Adriano13.webp',
          'img/Projetos/Adriano Silveira/Interiores/Int-Adriano12.webp',
          'img/Projetos/Adriano Silveira/Interiores/Int-Adriano15.webp',
        ],
        disabled: false,
        disableClick: false,
      },
      construction: {
        title: 'Obra',
        description: 'Construindo com propósito',
        categoryImage: 'img/Projetos/Adriano Silveira/Obra/Img-Obra-Adriano1.webp',
        details: 'Obras que transformam projetos em realidade com precisão e qualidade',
        detailGallery: [
          'img/Projetos/Adriano Silveira/Obra/Obra-Adriano1.mp4',
          'img/Projetos/Adriano Silveira/Obra/Obra-Adriano2.mp4',
          'img/Projetos/Adriano Silveira/Obra/Obra-Adriano3.mp4',
        ],
        disabled: false,
        disableClick: false,
      }
    },
    gallery: [ /* MAQUETE AQUI */],
    detailGallery: [],
    layoutType: 'horizontal'
  },

    'paulo': {
    name: 'P.L House',
    location: 'Alphaville • São Paulo',
    year: '2023',
    heroImage: 'img/Projetos/Paulo/Img/Img-Paulo-6.webp',
    description: 'Arquitetura que ganha vida.',
    categories: {
      architecture: {
        title: 'Projeto Arquitetônico',
        description: 'Formas que fluem',
        categoryImage: 'img/Projetos/Paulo/Img/Img-Paulo-5.webp',
        details: 'Uma arquitetura marcada por curvas e elementos únicos',
        projectImages: [],
        detailGallery: [
          'img/Projetos/Paulo/Videos/Anim-Paulo1.mp4',
          'img/Projetos/Paulo/Videos/Anim-Paulo2.mp4',
          'img/Projetos/Paulo/Videos/Anim-Paulo3.mp4',
          'img/Projetos/Paulo/Img/Img-Paulo-1.webp',
          'img/Projetos/Paulo/Img/Img-Paulo-2.webp',
          'img/Projetos/Paulo/Img/Img-Paulo-3.webp',
          'img/Projetos/Paulo/Img/Img-Paulo-4.webp',
          'img/Projetos/Paulo/Img/Img-Paulo-5.webp',
          'img/Projetos/Paulo/Img/Img-Paulo-6.webp',
        ]
      },
      interiors: {
        title: 'Interiores',
        description: 'Em breve',
        categoryImage: 'img/Img-EmBreve.webp',
        details: 'Interiores em desenvolvimento',
        detailGallery: [],
        disabled: true,
        disableClick: true,
      },
      construction: {
        title: 'Obra',
        description: 'Qualidade em cada etapa',
        categoryImage: 'img/Projetos/Paulo/Obra/Img-Obra-Paulo1.webp',
        details: 'Cada detalhe construído com rigor e excelência',
        detailGallery: [
          'img/Projetos/Paulo/Obra/Anim-Obra-Paulo.mp4'
        ],
        disabled: false,
        disableClick: false,
      }
    },
    gallery: [ /* MAQUETE AQUI */],
    detailGallery: [],
    layoutType: 'horizontal'
  },

    'tiago': {
    name: 'T.G House',
    location: 'Minas Gerais • Contagem',
    year: '2024',
    heroImage: 'img/Projetos/Tiago/Img-Tiago10.webp',
    description: 'Para quem exige o melhor.',
    categories: {
      architecture: {
        title: 'Projeto Arquitetônico',
        description: 'Sofisticação que se sente',
        categoryImage: 'img/Projetos/Paulo/Img/Img-Paulo-5.webp',
        details: 'Linhas modernas, vida extraordinária',
        projectImages: [],
        detailGallery: [
          'img/Projetos/Tiago/Videos/Anim-Tiago1.mp4',
          'img/Projetos/Tiago/Videos/Anim-Tiago2.mp4',
          'img/Projetos/Tiago/Videos/Anim-Tiago3.mp4',
          'img/Projetos/Tiago/Img-Tiago1.webp',
          'img/Projetos/Tiago/Img-Tiago2.webp',
          'img/Projetos/Tiago/Img-Tiago6.webp',
          'img/Projetos/Tiago/Img-Tiago4.webp',
          'img/Projetos/Tiago/Img-Tiago5.webp',
          'img/Projetos/Tiago/Img-Tiago3.webp',
          'img/Projetos/Tiago/Img-Tiago7.webp',
          'img/Projetos/Tiago/Img-Tiago8.webp',
          'img/Projetos/Tiago/Img-Tiago9.webp',
        ]
      },
      interiors: {
        title: 'Interiores',
        description: 'Em breve',
        categoryImage: 'img/Img-EmBreve.webp',
        details: 'Interiores em desenvolvimento',
        detailGallery: [],
        disabled: true,
        disableClick: true,
      },
      construction: {
        title: 'Obra',
        description: 'Em Breve',
        categoryImage: 'img/Img-EmBreve.webp',
        details: 'Obras que transformam projetos em realidade com precisão e qualidade',
        detailGallery: [],
        disabled: true,
        disableClick: true,
      }
    },
    gallery: [ /* MAQUETE AQUI */],
    detailGallery: [],
    layoutType: 'horizontal'
  },

    'renatoramos': {
    name: 'R.R House',
    location: 'Minas Gerais • Contagem',
    year: '2022',
    heroImage: 'img/Projetos/Renato-Ramos/Img/Img-RenatoRamos4.webp',
    description: 'Para quem exige o melhor.',
    categories: {
      architecture: {
        title: 'Projeto Arquitetônico',
        description: 'Minimalismo elegante com presença marcante',
        categoryImage: 'img/Projetos/Renato-Ramos/Img/Img-RenatoRamos2.webp',
        details: 'Mais que um ambiente, uma vivência',
        projectImages: [],
        detailGallery: [
          'img/Projetos/Renato-Ramos/Videos/Anim-Renatoramos1.mp4',
          'img/Projetos/Renato-Ramos/Videos/Anim-Renatoramos2.mp4',
          'img/Projetos/Renato-Ramos/Videos/Anim-Renatoramos3.mp4',
          'img/Projetos/Renato-Ramos/Img/Img-RenatoRamos1.webp',
          'img/Projetos/Renato-Ramos/Img/Img-RenatoRamos2.webp',
          'img/Projetos/Renato-Ramos/Img/Img-RenatoRamos4.webp',
          'img/Projetos/Renato-Ramos/Img/Img-RenatoRamos5.webp',
          'img/Projetos/Renato-Ramos/Img/Img-RenatoRamos6.webp',
          'img/Projetos/Renato-Ramos/Img/Img-RenatoRamos7.webp',
          'img/Projetos/Renato-Ramos/Img/Img-RenatoRamos8.webp',
          'img/Projetos/Renato-Ramos/Img/Img-RenatoRamos9.webp',
          'img/Projetos/Renato-Ramos/Img/Img-RenatoRamos10.webp',
        ]
      },
      interiors: {
        title: 'Interiores',
        description: 'Seu espaço, sua essência',
        categoryImage: 'img/Projetos/Renato-Ramos/Interiores/Int-RenatoRamos5.webp',
        details: 'Design pensado para refletir estilo e conforto em cada detalhe.',
        detailGallery: [
          'img/Projetos/Renato-Ramos/Interiores/Int-RenatoRamos1.webp',
          'img/Projetos/Renato-Ramos/Interiores/Int-RenatoRamos2.webp',
          'img/Projetos/Renato-Ramos/Interiores/Int-RenatoRamos3.webp',
          'img/Projetos/Renato-Ramos/Interiores/Int-RenatoRamos4.webp',
          'img/Projetos/Renato-Ramos/Interiores/Int-RenatoRamos5.webp',
          'img/Projetos/Renato-Ramos/Interiores/Int-RenatoRamos6.webp',
          'img/Projetos/Renato-Ramos/Interiores/Int-RenatoRamos7.webp',
          'img/Projetos/Renato-Ramos/Interiores/Int-RenatoRamos8.webp',
          'img/Projetos/Renato-Ramos/Interiores/Int-RenatoRamos9.webp',
          'img/Projetos/Renato-Ramos/Interiores/Int-RenatoRamos10.webp',
          'img/Projetos/Renato-Ramos/Interiores/Int-RenatoRamos11.webp',
          'img/Projetos/Renato-Ramos/Interiores/Int-RenatoRamos12.webp',
          'img/Projetos/Renato-Ramos/Interiores/Int-RenatoRamos13.webp',
          'img/Projetos/Renato-Ramos/Interiores/Int-RenatoRamos14.webp',
          'img/Projetos/Renato-Ramos/Interiores/Int-RenatoRamos15.webp',

        ],
        disabled: false,
        disableClick: false,
      },
      construction: {
        title: 'Obra',
        description: 'Planejamento que vira resultado',
        categoryImage: 'img/Projetos/Renato-Ramos/Obras/Obra-RenatoRamos1.webp',
        details: 'Execução de alto padrão que respeita cada detalhe do projeto',
        detailGallery: [
          'img/Projetos/Renato-Ramos/Obras/Anim-Obra-RenatoRamos1.mp4',
          'img/Projetos/Renato-Ramos/Obras/Anim-Obra-RenatoRamos2.mp4',
          'img/Projetos/Renato-Ramos/Obras/Anim-Obra-RenatoRamos3.mp4',
        ],
        disabled: false,
        disableClick: false,
      }
    },
    gallery: [ /* MAQUETE AQUI */],
    detailGallery: [],
    layoutType: 'horizontal'
  },
};

// =============================================
// PROJECT MODAL FUNCTIONS
// =============================================

// Cache dos elementos do modal
const modalCache = {
  modal: null,
  modalBody: null,
  get() {
    if (!this.modal) {
      this.modal = document.getElementById('projectModal');
      this.modalBody = document.getElementById('modalBody');
    }
    return { modal: this.modal, modalBody: this.modalBody };
  }
};

// Abrir projeto no modal
function openProject(projectId) {
  const project = projectsData[projectId];
  if (!project) return;

  const { modal, modalBody } = modalCache.get();
  if (!modal || !modalBody) return;

  // Construir conteúdo do modal de forma mais eficiente
  const categoryButtons = Object.entries(project.categories).map(([key, category], index) => {
    const activeClass = index === 0 ? 'active' : 'inactive';
    const isDisabled = category.disabled ? 'disabled' : '';
    const onclickAttr = category.disabled ? '' : `onclick="goToProjectDetail('${projectId}', '${key}')"`;

    return `
      <div class="category-item ${activeClass} ${isDisabled}" ${onclickAttr} data-category="${key}">
        <div class="category-image-wrapper">
          <img src="${category.categoryImage}" alt="${category.title}" class="category-single-image" loading="lazy" decoding="async">
        </div>
        <h4 class="category-name">${category.title}</h4>
        <p class="category-description">${category.description}</p>
      </div>
    `;
  }).join('');

  const galleryItems = project.gallery.map(item => {
    if (item.endsWith('.mp4')) {
      return `<div class="gallery-item"><video class="lazy-video" muted loop playsinline preload="none" data-src="${item}"><source data-src="${item}" type="video/mp4"></video></div>`;
    } else {
      return `<div class="gallery-item"><img loading="lazy" decoding="async" src="${item}" alt=""></div>`;
    }
  }).join('');

  modalBody.innerHTML = `
    <div class="project-hero">
      <img src="${project.heroImage}" alt="${project.name}" decoding="async">

    </div>
    <div class="project-intro">
<div class="project-detail-header">
      <h1 class="project-title">${project.name}</h1>
      <span class="project-city">${project.location}</span>
      <span class="project-year">${project.year}</span>
    </div>

        </div>
      </div>
      <p class="project-description">${project.description}</p>
    </div>
    
    <div class="category-grid">
      <div class="category-container">
        ${categoryButtons}
      </div>
    </div>
    <div class="gallery-section">
      <div class="gallery-grid">
        ${galleryItems}
      </div>
    </div>
  `;

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  // Inicializar lazy loading de vídeos
  requestAnimationFrame(() => initLazyVideos());
}

// Lazy loading de vídeos com Intersection Observer
function initLazyVideos() {
  const lazyVideos = document.querySelectorAll('video.lazy-video');
  
  if (!lazyVideos.length) return;
  
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          const source = video.querySelector('source');
          
          // Carregar o vídeo
          if (source?.dataset.src) {
            source.src = source.dataset.src;
            video.load();
            
            // Reproduzir quando estiver pronto
            video.addEventListener('loadeddata', () => {
              video.play().catch(e => console.log('Video autoplay prevented:', e));
            }, { once: true });
            
            video.classList.remove('lazy-video');
            observer.unobserve(video);
          }
        }
      });
    }, {
      rootMargin: '50px',
      threshold: 0.1
    });
    
    lazyVideos.forEach(video => videoObserver.observe(video));
  } else {
    // Fallback para navegadores sem suporte a IntersectionObserver
    lazyVideos.forEach(video => {
      const source = video.querySelector('source');
      if (source?.dataset.src) {
        source.src = source.dataset.src;
        video.load();
        video.play().catch(e => console.log('Video autoplay prevented:', e));
      }
    });
  }
}

// Ir para página de detalhe do projeto
function goToProjectDetail(projectId, categoryKey) {
  window.location.href = `project-detail.html?project=${projectId}&category=${categoryKey}`;
}

// Fechar modal
function closeProject() {
  const { modal } = modalCache.get();
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Parar todos os vídeos quando fechar o modal
    const videos = modal.querySelectorAll('video');
    videos.forEach(video => {
      video.pause();
      video.currentTime = 0;
    });
  }
}

// =============================================
// GLOBAL EVENT LISTENERS
// =============================================

// Fechar modal ao clicar fora (delegado)
window.addEventListener('click', (event) => {
  const { modal } = modalCache.get();
  if (event.target === modal) {
    closeProject();
  }
}, { passive: true });

// Suporte a ESC para fechar modal
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const { modal } = modalCache.get();
    if (modal && modal.style.display === 'block') {
      closeProject();
    }
  }
});

// Scroll suave entre páginas (delegado)
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (anchor) {
    e.preventDefault();
    const href = anchor.getAttribute('href');
    if (href && href !== '#' && href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }
});

// Transição suave entre páginas
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link) return;
  
  const href = link.getAttribute('href');
  // Permitir links com âncoras internas, externos ou com target blank
  if (!href || href.startsWith('#') || link.target === '_blank' || href.startsWith('http')) {
    return;
  }
});

// Carregar AOS quando página carregar
window.addEventListener('load', () => {
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}, { once: true });

// =============================================
// DRAGGABLE ICON WITH CANVAS DRAWING
// =============================================
const initDraggableIcon = () => {
  const img = document.getElementById('draggable');
  const canvas = document.getElementById('drawCanvas');
  
  if (!img || !canvas) return;
  
  const ctx = canvas.getContext('2d', { alpha: true });

  // Ajusta tamanho do canvas
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
  resizeCanvas();
  // O seu projeto já tem o debounce, então vai funcionar normal aqui
  window.addEventListener('resize', debounce(resizeCanvas, 200));

  // ==========================================
  // CENTRALIZAR O ÍCONE NO INÍCIO
  // ==========================================
  const centerIcon = () => {
    img.style.position = 'absolute'; 
    const centroX = (window.innerWidth / 2) - (img.offsetWidth / 2);
    const centroY = (window.innerHeight / 2) - (img.offsetHeight / 2);
    
    img.style.left = `${centroX}px`;
    img.style.top = `${centroY}px`;
  };

  // Espera a imagem carregar completamente antes de centralizar
  if (img.complete) {
    // Imagem já está em cache, centraliza logo
    centerIcon();
  } else {
    // Imagem precisa ser carregada, aguarda o evento load
    img.addEventListener('load', centerIcon, { once: true });
  }

  let isDragging = false;
  let offsetX, offsetY;
  let rafId = null;
  let currentX, currentY;
  
  // VARIÁVEIS PARA A LINHA CONTÍNUA
  let lastDrawX = null;
  let lastDrawY = null;

  // Configuração visual da "caneta"
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)'; // Cor e transparência
  ctx.lineWidth = 4; // Grossura da linha
  ctx.lineCap = 'round'; // Pontas arredondadas
  ctx.lineJoin = 'round'; // Curvas suaves

  // Mouse/Touch down
  const handleStart = (e) => {
    e.preventDefault();
    isDragging = true;
    
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    
    offsetX = clientX - img.offsetLeft;
    offsetY = clientY - img.offsetTop;
    img.style.cursor = 'grabbing';

    // Pega a posição inicial exata do centro do ícone para começar a linha
    lastDrawX = img.offsetLeft + (img.offsetWidth / 2);
    lastDrawY = img.offsetTop + (img.offsetHeight / 2);
  };

  // Mouse/Touch move
  const handleMove = (e) => {
    if (!isDragging) return;
    
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    
    currentX = clientX - offsetX;
    currentY = clientY - offsetY;
    
    // Usar RAF para otimizar rendering
    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        // 1. Move a imagem
        img.style.left = currentX + 'px';
        img.style.top = currentY + 'px';

        // 2. Calcula o novo centro do ícone
        const centerX = currentX + (img.offsetWidth / 2);
        const centerY = currentY + (img.offsetHeight / 2);

        // 3. Desenha a linha conectando o último ponto ao ponto atual
        ctx.beginPath();
        ctx.moveTo(lastDrawX, lastDrawY);
        ctx.lineTo(centerX, centerY);
        ctx.stroke();
        
        // 4. Salva a posição atual para o próximo frame
        lastDrawX = centerX;
        lastDrawY = centerY;

        rafId = null;
      });
    }
  };

  // Mouse/Touch up
  const handleEnd = () => {
    isDragging = false;
    img.style.cursor = 'grab';
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  // Event listeners otimizados
  img.addEventListener('mousedown', handleStart);
  img.addEventListener('touchstart', handleStart, { passive: false });
  
  // Capturando o movimento direto no documento para não perder o ícone
  document.addEventListener('mousemove', handleMove);
  document.addEventListener('touchmove', handleMove, { passive: false });
  
  document.addEventListener('mouseup', handleEnd);
  document.addEventListener('touchend', handleEnd);
};

// Inicializar após DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDraggableIcon);
} else {
  initDraggableIcon();
}

// =============================================
// MENU AND HEADER FUNCTIONALITY
// =============================================

// Envolver todo o código em DOMContentLoaded para garantir que execute após carregar o DOM
document.addEventListener('DOMContentLoaded', function() {
  
  // Cache de elementos do menu
  const menuElements = {
    toggle: document.getElementById('menuToggle'),
    menu: document.getElementById('navMenu'),
    overlay: document.getElementById('menuOverlay'),
    header: document.querySelector('.main-header'),
    items: []
  };

  // Helper para fechar menu
  const closeMenu = () => {
    const { toggle, menu, overlay } = menuElements;
    toggle?.classList.remove('active');
    menu?.classList.remove('active');
    overlay?.classList.remove('active');
    document.body.classList.remove('menu-open');
    
    // Atualizar aria-expanded
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }
  };

  // Menu Toggle Functionality
  if (menuElements.toggle && menuElements.menu && menuElements.overlay) {
    // Cachear items do menu
    menuElements.items = Array.from(menuElements.menu.querySelectorAll('.nav-item'));
    
    // Abrir/fechar menu
    menuElements.toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const isActive = menuElements.toggle.classList.toggle('active');
      menuElements.menu.classList.toggle('active', isActive);
      menuElements.overlay.classList.toggle('active', isActive);
      document.body.classList.toggle('menu-open', isActive);
      
      // Atualizar aria-expanded
      menuElements.toggle.setAttribute('aria-expanded', isActive.toString());
    });

    // Fechar menu ao clicar no overlay
    menuElements.overlay.addEventListener('click', closeMenu);

    // Fechar menu ao clicar em um item (event delegation)
    menuElements.menu.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-item')) {
        closeMenu();
      }
    });

    // Fechar menu com tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuElements.menu.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // Header scroll effect (otimizado com RAF)
  if (menuElements.header) {
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    const updateHeader = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > 50) {
        menuElements.header.classList.add('scrolled');
      } else {
        menuElements.header.classList.remove('scrolled');
      }
      
      lastScrollY = scrollY;
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
    
    // Inicializar estado do header
    updateHeader();
  }

  // Smooth scroll para links âncora (otimizado com event delegation)
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    
    const href = anchor.getAttribute('href');
    if (!href || href === '#' || href.length <= 1) return;
    
    const target = document.querySelector(href);
    if (!target) return;
    
    e.preventDefault();
    const headerHeight = menuElements.header?.offsetHeight || 70;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }); 
  
  // Suporte de teclado para botão da equipe
  const teamButton = document.querySelector('.team-image-container[role="button"]');
  if (teamButton) {
    teamButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.location.href = 'team.html';
      }
    });
  }

  

  

}); // Fim do DOMContentLoaded