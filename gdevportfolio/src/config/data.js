// src/config/data.js
export const config = {
    // Iconos del sistema
    systemIcons: {
      minimize: '/icons/minimize.png',
      maximize: '/icons/maximize.png',
      close: '/icons/close.png',
      sound: '/icons/sound.png',
      soundMuted: '/icons/sound-muted.png',
      network: '/icons/network.png',
      viewIcons: '/icons/view-icons.png',
      viewList: '/icons/view-list.png',
      document: '/icons/doc.png',
      pdf: '/icons/pdf.png'
    },
  
    // Iconos del escritorio
    desktopIcons: [
      {
        id: 'about',
        title: 'Sobre Mí',
        icon: '/icons/about.png',
        position: { x: 20, y: 20 },
        type: 'profile'
      },
      {
        id: 'experience',
        title: 'Experiencia',
        icon: '/icons/folder.png',
        position: { x: 20, y: 100 },
        type: 'folder'
      },
      {
        id: 'education',
        title: 'Formación',
        icon: '/icons/education.png',
        position: { x: 20, y: 180 },
        type: 'folder'
      },
      {
        id: 'projects',
        title: 'Proyectos',
        icon: '/icons/projects.png',
        position: { x: 20, y: 260 },
        type: 'folder'
      },
      {
        id: 'email',
        title: 'Email',
        icon: '/icons/email.png',
        position: { x: 20, y: 340 },
        type: 'link',
        url: 'mailto:davidgomez.seg@gmail.com'
      },
      {
        id: 'linkedin',
        title: 'LinkedIn',
        icon: '/icons/linkedin.png',
        position: { x: 20, y: 420 },
        type: 'link',
        url: 'https://www.linkedin.com/in/tu-perfil'
      }
    ],
  
    // Datos del perfil
    profile: {
      name: 'David Gómez Díaz',
      role: 'JUNIOR FULL-STACK WEB DEVELOPER',
      avatar: '/images/avatar.png',
      stats: [
        { label: 'Proyectos', value: '5+' },
        { label: 'Bootcamp', value: '850h' },
        { label: 'Exp.', value: '16' }
      ],
      bio: 'Persona de altas capacidades, buscando aprender, crecer y poner a disposición mis habilidades.',
      badges: [
        { icon: '/icons/badge-cert.png', text: 'Certificado de discapacidad 33%' },
        { icon: '/icons/badge-location.png', text: 'A Coruña, España' },
        { icon: '/icons/badge-web.png', text: 'www.davidgdev.es/portfolio' }
      ],
      skills: [
        { name: 'Angular', icon: '/icons/skill-angular.png' },
        { name: 'Vue', icon: '/icons/skill-vue.png' },
        { name: 'React', icon: '/icons/skill-react.png' },
        { name: 'SpringBoot', icon: '/icons/skill-spring.png' },
        { name: 'Laravel', icon: '/icons/skill-laravel.png' },
        { name: 'Next.js', icon: '/icons/skill-next.png' }
      ],
      gallery: [
        {
          image: '/images/profile1.png',
          description: 'Participando en hackathon'
        },
        {
          image: '/images/profile2.png',
          description: 'Premio mejor diseño'
        }
      ]
    },
  
    // Datos de experiencia
    experience: [
      { 
        id: 'exp1', 
        title: 'Full Stack Web Developer.doc', 
        icon: '/icons/doc.png',
        company: 'Freelance',
        date: 'Oct 2023 - Feb 2024',
        content: {
          role: 'Full Stack Web Developer',
          company: 'Freelance',
          period: 'Octubre 2023 - Febrero 2024',
          projects: [
            'Plataforma de retransmisión de eventos en vivo',
            'Plataforma de juegos adultos',
            'Plataforma de juegos pedagógicos'
          ],
          technologies: ['Angular', 'Firebase', 'Git', 'Trello', 'CDN de video', 'Android', 'iOS'],
          links: {
            company: {
              title: 'Ver Perfil',
              url: 'https://linkedin.com/company/freelance'
            }
          }
        }
      },
      // ... resto de experiencias
    ],
  
    // Datos de formación
    education: [
      { 
        id: 'edu1', 
        title: 'Bootcamp Full-Stack.doc', 
        icon: '/icons/doc.png',
        institution: 'Factoria F5',
        date: 'Abr 2023 - Oct 2023',
        content: {
          program: 'Bootcamp Desarrollador Full-Stack',
          institution: 'Factoria F5',
          period: 'Abril 2023 - Octubre 2023',
          duration: '850 horas',
          technologies: [
            'Angular', 'Springboot', 'SQL', 'API Rest', 
            'Bootstrap', 'Jira', 'Confluence', 'Figma', 
            'Git', 'node.js'
          ],
          funding: 'Financiado por NTT DATA'
        }
      }
    ],
  
    // Datos de proyectos
    projects: [
      { 
        id: 'proj1', 
        title: 'Plataforma Streaming.pdf', 
        icon: '/icons/pdf.png',
        date: '2024',
        content: {
          title: 'Plataforma de Streaming',
          description: 'Plataforma de retransmisión de eventos en vivo',
          technologies: ['Angular', 'Firebase', 'Git', 'Trello', 'CDN de video'],
          images: [
            {
              url: '/projects/streaming1.png',
              description: 'Panel de control de streaming'
            },
            {
              url: '/projects/streaming2.png',
              description: 'Interfaz del reproductor'
            }
          ],
          links: {
            demo: {
              title: 'Ver Demo',
              url: 'https://streaming-demo.davidgdev.es'
            },
            github: {
              title: 'Código Fuente',
              url: 'https://github.com/davidgdev/streaming-platform'
            }
          }
        }
      }
      // ... resto de proyectos
    ]
  }