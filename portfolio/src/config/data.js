export const PORTFOLIO_DATA = {
  personal: {
    name: "SUJITH HARSHA",
    role: "AI Creator • Developer • Editor • Entrepreneur",
    shortStatement: "I TURN IDEAS INTO EXPERIENCES.",
    secondaryStatement: "I build digital experiences, experiment with AI and turn ambitious ideas into real products.",
    aboutText: [
      "I'm interested in the intersection of technology, creativity and entrepreneurship.",
      "I enjoy taking an idea from a rough concept and turning it into something people can actually interact with.",
      "My interests span AI, web experiences, product design, electronics, automation, video editing and emerging technology."
    ],
    aboutKeywords: [
      "AI", "BUILD", "DESIGN", "CREATE", "EXPERIMENT", "LEARN"
    ],
    philosophy: {
      headline: "BUILD.\nBREAK.\nLEARN.\nREBUILD.",
      subtext: "The goal isn't to know everything.\nIt's to keep building until the idea becomes real."
    }
  },
  
  projects: [
    {
      id: "rathora",
      name: "RATHORA",
      category: "AUTOMOTIVE • E-COMMERCE • AI • PRODUCT EXPERIENCE",
      description: "A premium automotive accessories and digital commerce concept exploring how AI, interactive interfaces and cinematic product experiences can come together.",
      label: "PERSONAL PROJECT",
      status: "Completed",
      thumbnail: "/assets/placeholder-rathora.jpg",
      heroMedia: null,
      externalUrl: null,
      technologies: ["React", "WebGL", "Framer Motion"],
      layoutType: "featured"
    },
    {
      id: "dhanurx",
      name: "DHANURX",
      category: "E-COMMERCE • AI • INTERACTIVE WEB",
      description: "An archery-focused digital commerce and interactive experience concept combining product discovery, AI assistance and immersive web design.",
      label: "PERSONAL PROJECT",
      status: "Completed",
      thumbnail: "/assets/placeholder-dhanurx.jpg",
      heroMedia: null,
      externalUrl: null,
      technologies: ["React", "Three.js", "AI Integration"],
      layoutType: "medium"
    },
    {
      id: "ai-video",
      name: "AI VIDEO STUDIO",
      category: "AI • GENERATIVE MEDIA • CREATIVE TECHNOLOGY",
      description: "A personal experimentation project exploring AI-assisted video generation and creative workflows.",
      label: "EXPERIMENT",
      status: "Completed",
      thumbnail: "/assets/placeholder-aivideo.jpg",
      heroMedia: null,
      externalUrl: null,
      technologies: ["Generative AI", "Video Processing", "Web Automation"],
      layoutType: "standard"
    },
    {
      id: "the-lab",
      name: "THE LAB",
      category: "AI • WEB • EXPERIMENTS",
      description: "A collection of experiments involving AI interfaces, interactive websites, generative visuals, games and emerging technologies.",
      label: "ONGOING",
      status: "In Progress",
      thumbnail: "/assets/placeholder-lab.jpg",
      heroMedia: null,
      externalUrl: null,
      technologies: ["Various", "Experimental"],
      layoutType: "standard"
    }
  ],
  
  experienceTimeline: [
    { number: "01", title: "IDEA", description: "Concept and research" },
    { number: "02", title: "DESIGN", description: "Visual direction and user experience" },
    { number: "03", title: "BUILD", description: "Development and integration" },
    { number: "04", title: "EXPERIMENT", description: "AI, interaction and iteration" },
    { number: "05", title: "SHIP", description: "Testing, refinement and deployment" }
  ],
  
  skills: {
    development: ["HTML", "CSS", "JavaScript", "React", "Next.js", "APIs", "Supabase", "Firebase"],
    ai: ["Generative AI", "AI workflows", "Prompt engineering", "AI interfaces", "AI-assisted development", "Multimodal experimentation"],
    creative: ["Video editing", "Cinematic storytelling", "Motion design", "Visual design", "Photography", "Content creation"],
    technology: ["Electronics", "Embedded systems", "IoT", "Quantum computing exploration", "Future technology"]
  },

  experiments: [
    { title: "AI Interfaces", status: "BUILDING" },
    { title: "3D Interactions", status: "PROTOTYPE" },
    { title: "Generative Visuals", status: "EXPERIMENT" },
    { title: "Web Experiments", status: "EXPLORING" },
    { title: "Game Concepts", status: "PROTOTYPE" },
    { title: "Electronics", status: "EXPERIMENT" },
    { title: "Future Tech", status: "EXPLORING" },
    { title: "Motion UX", status: "BUILDING" }
  ],

  currentlyExploring: [
    "Artificial Intelligence", "Quantum Computing", "Embedded Systems", 
    "Robotics", "Creative Technology", "Generative Media", 
    "Product Design", "Entrepreneurship"
  ],

  journey: [
    {
      number: "01",
      stage: "CURIOUS",
      description: "An obsession with understanding how things work under the hood — from code and electronics to cinematic frames."
    },
    {
      number: "02",
      stage: "LEARNING",
      description: "Mastering modern web development, exploring generative AI workflows, and studying product architecture."
    },
    {
      number: "03",
      stage: "BUILDING",
      description: "Turning rough concepts into interactive software, working prototypes, and functional systems."
    },
    {
      number: "04",
      stage: "EXPERIMENTING",
      description: "Pushing limits with WebGL shaders, multimodal AI, motion physics, and unconventional digital experiences."
    },
    {
      number: "05",
      stage: "CREATING",
      description: "Directing cinematic visual media, designing editorial interfaces, and blending technology with storytelling."
    },
    {
      number: "06",
      stage: "ENTREPRENEURSHIP",
      description: "Connecting design, engineering, and product strategy to launch ambitious ideas into real-world ventures."
    }
  ],

  contact: {
    email: "mailto:sujitharshat@gmail.com",
    emailRaw: "sujitharshat@gmail.com",
    instagram: "https://www.instagram.com/ft.sujeeth/",
    instagramHandle: "@ft.sujeeth",
    github: "https://github.com/sujithharshaT",
    githubHandle: "sujithharshaT",
    linkedin: "https://www.linkedin.com/in/sujith-harsha-t-29bb38200",
    linkedinHandle: "sujith-harsha-t-29bb38200"
  },

  creativeWork: [
    {
      id: "featured-reel",
      title: "DIRECTOR'S REEL",
      category: "CINEMATIC EDIT",
      description: "A showcase of visual storytelling, motion design, and cinematography.",
      type: "video",
      mediaUrl: null, // Placeholder
      posterUrl: null, // Placeholder
      isFeatured: true
    },
    {
      id: "tokyo-drift",
      title: "TOKYO NIGHTS",
      category: "TRAVEL FILMMAKING",
      description: "An exploration of cyberpunk aesthetics in the streets of Shinjuku.",
      type: "video",
      mediaUrl: null,
      isFeatured: false
    },
    {
      id: "ai-landscapes",
      title: "SYNTHETIC NATURE",
      category: "AI-GENERATED VISUALS",
      description: "Exploring the boundary between organic forms and algorithmic generation.",
      type: "image",
      mediaUrl: null,
      isFeatured: false
    },
    {
      id: "monochrome",
      title: "MONOCHROME STREETS",
      category: "PHOTOGRAPHY",
      description: "Street photography focusing on high contrast and human emotion.",
      type: "image",
      mediaUrl: null,
      isFeatured: false
    },
    {
      id: "motion-lab",
      title: "KINETIC TYPE",
      category: "MOTION EXPERIMENTS",
      description: "Physics-based typography and WebGL motion design.",
      type: "video",
      mediaUrl: null,
      isFeatured: false
    }
  ],

  certificates: [
    {
      id: "ai-summer-camp",
      title: "SUMMER CAMP - AI",
      distinction: "GOLD AWARD",
      badge: "GOLD DISTINCTION",
      issuer: "AI Intensive Summer Academy",
      domain: "ARTIFICIAL INTELLIGENCE",
      credentialId: "SH-AI-001",
      description: "Conferred the prestigious Gold Award distinction for outstanding achievement and technical excellence across machine learning algorithms, deep learning foundations, and modern AI architectures.",
      skills: ["Machine Learning", "Neural Networks", "Python", "Generative AI"],
      theme: "gold",
      verificationUrl: "https://sites.google.com/view/sujithharshas-t/certificates-of-sujith-harsha"
    },
    {
      id: "ignition-startup",
      title: "FROM IGNITION",
      distinction: "BUILDING A STARTUP",
      badge: "VENTURE FELLOW",
      issuer: "Ignition Startup Acceleration",
      domain: "ENTREPRENEURSHIP",
      credentialId: "SH-IGN-002",
      description: "Selected recognition for startup ideation, venture incubation, and business viability modeling—turning ambitious digital concepts into validated real-world initiatives.",
      skills: ["Product Strategy", "Venture Building", "System Architecture", "Prototyping"],
      theme: "amber",
      verificationUrl: "https://sites.google.com/view/sujithharshas-t/certificates-of-sujith-harsha"
    },
    {
      id: "git-github-quiz",
      title: "GIT & GITHUB - QUIZ",
      distinction: "PARTICIPATION",
      badge: "DEVELOPER VERIFIED",
      issuer: "Open Source Developer Foundation",
      domain: "SOFTWARE ENGINEERING",
      credentialId: "SH-GIT-003",
      description: "Certified proficiency in modern Git version control, branching strategies, collaborative repository engineering, pull-request lifecycles, and code synchronization.",
      skills: ["Git", "GitHub Workflows", "Version Control", "DevOps Foundations"],
      theme: "cyan",
      verificationUrl: "https://sites.google.com/view/sujithharshas-t/certificates-of-sujith-harsha"
    },
    {
      id: "nst-talent",
      title: "NST",
      distinction: "PARTICIPATION CERTIFICATE",
      badge: "NATIONAL TALENT",
      issuer: "National Science & Talent Council",
      domain: "ANALYTICAL SCIENCE",
      credentialId: "SH-NST-004",
      description: "National standard competitive evaluation acknowledging scientific acumen, quantitative reasoning, analytical deduction, and complex problem-solving capabilities.",
      skills: ["Scientific Logic", "Analytical Deduction", "Quantitative Reasoning"],
      theme: "emerald",
      verificationUrl: "https://sites.google.com/view/sujithharshas-t/certificates-of-sujith-harsha"
    }
  ]
};
