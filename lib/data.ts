// Personal Information
export const personalInfo = {
  name: "Daniel Camacho",
  role: "Software Developer",
  tagline: "Structured, thoughtful, and a little obsessive about detail.",
  bio: "I'm a software engineer focused on building practical, well-crafted solutions. I enjoy transforming ideas into products that are intuitive, reliable, and meaningful. Every project is an opportunity to learn, improve, and create something worth using.",
  email: "danielcamacho0416@gmail.com",
  github: "https://github.com/DanielHC16",
  linkedin: "https://linkedin.com/in/danielcamacho777",
  instagram: "https://www.instagram.com/daji.env",
  portia: "https://portia-compiler.vercel.app/"
};

// About Me Points
export const aboutPoints = [
  {
    title: "Building With Intention",
    description: "Turning ideas into thoughtful, practical solutions through code, creativity, and attention to detail."
  },
  {
    title: "Curious Problem Solver",
    description: "Enjoy solving complex challenges by breaking them down, asking questions, and finding better ways forward."
  },
  {
    title: "Always Learning",
    description: "Driven by a constant desire to grow, refine my craft, and explore new technologies and perspectives."
  },
  {
    title: "Leading With Purpose",
    description: "Bringing structure, accountability, and a collaborative mindset to every team and project I’m part of."
  }
];

// Projects
export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: ProjectImage;
  images?: ProjectImage[];
  links: {
    demo?: string;
    github?: string;
  };
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "PORTIA Language and Compiler",
    description: "A high-level, statically typed procedural language and compiler designed around strict clarity, readable syntax, and precise execution.",
    tags: ["Python", "TypeScript", "FastAPI", "Compiler", "Automata", "Language Design"],
    image: {
      src: "/projects/portia1.png",
      alt: "PORTIA compiler preview"
    },
    images: [
      {
        src: "/projects/portia1.png",
        alt: "PORTIA compiler preview 1"
      },
      {
        src: "/projects/portia2.png",
        alt: "PORTIA compiler preview 2"
      },
      {
        src: "/projects/portia3.png",
        alt: "PORTIA compiler preview 3"
      }
    ],
    links: {
      demo: "https://portia-compiler.vercel.app/",
      github: "https://github.com/DanielHC16/portia-compiler"
    },
    featured: true
  },
  {
    id: 2,
    title: "Sta. Mesa 587 Connect",
    description: "Sta. Mesa 587 Connect is a PWA for Barangay 587, with over 1000 users. It streamlines document requests, issue reporting, and updates, backed by a dedicated admin system to manage it all.",
    tags: ["Next.js", "TypeScript", "PWA", "Tailwind CSS", "Real-Time", "NeonDB"],
    image: {
      src: "/projects/587-1.png",
      alt: "Sta. Mesa 587 Connect dashboard preview"
    },
    images: [
      {
        src: "/projects/587-1.png",
        alt: "Sta. Mesa 587 Connect dashboard preview 1"
      },
      {
        src: "/projects/587-2.png",
        alt: "Sta. Mesa 587 Connect dashboard preview 2"
      },
      {
        src: "/projects/587-3.png",
        alt: "Sta. Mesa 587 Connect dashboard preview 3"
      }
    ],
    links: {
      demo: "https://587connect-hero.vercel.app"
    },
    featured: true
  },
  {
    id: 3,
    title: "MEDIC: Monitoring For Elderly Daily Intervention & Care",
    description: "A care support and monitoring app for elderly patients, caregivers, and family members, built around daily care and medication coordination.",
    tags: ["NextJS", "TypeScript", "React", "Gemini AI", "PWA", "NeonDB"],
    image: {
      src: "/projects/medic.png",
      alt: "MEDIC dashboard preview"
    },
    images: [
      {
        src: "/projects/medic.png",
        alt: "MEDIC dashboard preview 1"
      },
      {
        src: "/projects/medic1.jpg",
        alt: "MEDIC dashboard preview 2"
      },
      {
        src: "/projects/medic2.jpg",
        alt: "MEDIC dashboard preview 3"
      },
      {
        src: "/projects/medic3.jpg",
        alt: "MEDIC dashboard preview 4"
      },
      {
        src: "/projects/medic4.jpg",
        alt: "MEDIC dashboard preview 5"
      }
    ],
    links: {
      demo: "https://medic-orpin.vercel.app/",
      github: "https://github.com/DanielHC16/medic"
    },
    featured: true
  },
  {
    id: 7,
    title: "AIvin: Smart Multi-Institute Queuing System",
    description: "AIvin modernizes institutional queuing using an AI agent that guides users through requirements and forms before issuing a ticket.",
    tags: ["Next.js", "TypeScript", "Gemini AI"],
    image: {
      src: "/projects/alvin.png",
      alt: "AIvin queuing system preview"
    },
    images: [
      {
        src: "/projects/alvin.png",
        alt: "AIvin queuing system preview 1"
      },
      {
        src: "/projects/alvin1.png",
        alt: "AIvin queuing system preview 2"
      },
      {
        src: "/projects/alvin2.png",
        alt: "AIvin queuing system preview 3"
      }
    ],
    links: {
      github: "https://https://github.com/DanielHC16/Smart-Multi-Institute-Queuing-System.com/DanielHC16/dcamacho-dev"
    }
  },
  {
    id: 6,
    title: "PayFlow",
    description: "A B2B2C payroll platform concept with AI-assisted migration and employee wage access flows for modern payroll management.",
    tags: ["NextJS", "Python", "OpenAI GPT-4", "MVP", "Hackathon Finalist"],
    image: {
      src: "/projects/PAYFLOW.png",
      alt: "PayFlow payroll dashboard preview"
    },
    images: [
      {
        src: "/projects/PAYFLOW.png",
        alt: "PayFlow payroll dashboard preview 1"
      },
      {
        src: "/projects/PAYFLOW1.png",
        alt: "PayFlow payroll dashboard preview 2"
      }
    ],
    links: {
      demo: "https://payflow-psi.vercel.app/",
      github: "https://github.com/DanielHC16/payflow"
    }
  },
  {
    id: 4,
    title: "TALLY: Think and Learn Life Yields",
    description: "TALLY is a gamified platform that bridges the financial literacy gap in the Philippines by making money management fun and engaging for the youth.",
    tags: ["FlutterFlow", "Hackathon Winner", "Fintech", "MVP"],
    image: {
      src: "/projects/TALLY.png",
      alt: "TALLY financial literacy project preview"
    },
    links: {
      github: "https://github.com/timtulang/Tally",
      demo: "https://devpost.com/software/tally-teach-and-learn-life-yields#/"
    }
  },
  {
    id: 5,
    title: "Enhanced GCN Vulnerability Prediction System",
    description: "A graph-based system that uses an enhanced Graph Convolutional Network (GCN) to predict vulnerabilities in the rice supply chain under climate and demand shocks.",
    tags: ["GCN", "Machine Learning", "Supply Chain", "Thesis", "Ongoing"],
    image: {
      src: "/projects/GCN-system.png",
      alt: "Placeholder project preview 7"
    },
    links: {
      github: "https://github.com/DanielHC16/gcn-enhanced-vulnerability-system"
    }
  },
  {
    id: 9,
    title: "SaaSified and Amplified: PHSW x PLM Event Website",
    description: "SaaSified and Amplified: Ascending Software to the Sky is a GDGoC PLM and Philippine Startup Week 2025 keynote focused on scaling Filipino software innovation globally.",
    tags: ["React", "Tailwind CSS", "Vercel"],
    image: {
      src: "/projects/PHSW.png",
      alt: "Placeholder project preview 9"
    },
    links: {
      demo: "https://phsw2025-b56f9.web.app/"
    }
  }
];

// Experience Timeline
export interface Experience {
  id: number;
  nodeNumber?: number;
  defaultActive?: boolean;
  period: string;
  title: string;
  company: string;
  location: string;
  type: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

// Replace or extend these entries to update the Experiences section.
export const experiences: Experience[] = [
  {
    id: 0,
    nodeNumber: 1,
    period: "2017-2023",
    title: "Academic Commissioned Work",
    company: "Freelance",
    location: "Manila, Philippines",
    type: "Freelance Work",
    summary:
      "Completed commissioned academic tasks such as essays, reports, and presentations based on client requirements, ensuring quality, proper formatting, and on-time delivery.",
    highlights: [
      "Completed commissioned academic tasks including essays, research papers, reports, and presentations based on specific requirements",
      "Conducted research and produced well-structured, properly formatted academic outputs",
      "Managed multiple deadlines while ensuring timely and quality delivery"
    ],
    stack: ["Microsoft Office", "Canva", "Photoshop", "Research", "Time Management", "Self Direction"]
  },
  {
    id: 1,
    nodeNumber: 2,
    period: "2025-2026",
    title: "Web Development Lead",
    company: "Google Developer Groups on Campus - PLM",
    location: "Manila, Philippines",
    type: "Academic Organization",
    summary:
      "Led web development projects and seminars, guiding team execution, technical direction, and delivery of responsive, scalable web applications.",
    highlights: [
      "Led a 10 person developer team, managing communication, task distribution, and technical alignment across projects",
      "Ensured strict deadline adherence through structured planning, sprint coordination, and progress tracking.",
      "Facilitated technical seminars to improve team skills and development practices."
    ],
    stack: ["React", "Next.js", "Leadership", "Communication"]
  },
  {
    id: 2,
    nodeNumber: 3,
    defaultActive: true,
    period: "Present",
    title: "Software Engineer Intern",
    company: "Aboitiz Foods Company - Pilmico Foods Corporation",
    location: "Makati, Philippines",
    type: "Traineeship",
    summary:
      "Develop and test responsive frontend web pages for internal applications, actively engaging in the full Agile software development lifecycle.",
    highlights: [
      "Engineer dynamic front-end web pages by building out UI designs, implementing core application logic, and consuming RESTful APIs.",
      "Execute unit and User Acceptance Testing (UAT) to ensure robust application performance.",
      "Drive project momentum through active participation in core Agile ceremonies."
    ],
    stack: ["JavaScript", "Jquery", "React", "APIs", "Git", "Agile", "Collaboration"]
  }
];

// Skills/Tools
export const skills = {
  languages: ["Python", "JavaScript", "TypeScript", "Java", "C"],
  frontend: ["React", "Next.js", "Tailwind CSS", "Jquery"],
  backend: ["Node.js", "Express", "FastAPI", "PostgreSQL", "SQLite", "NeonDB"],
  tools: ["Git", "Figma", "Vercel", "AWS", "GCP"]
};

// Soft Skills
export const softSkills = {
  communication: ["Public Speaking", "Technical Writing", "Active Listening", "Cross-functional"],
  leadership: ["Project Management", "Team Mentorship", "Event Coordination", "Agile Collaboration"],
  analytical: ["Critical Thinking", "Systems Analysis", "Research", "Adaptability"],
  work_ethic: ["Time Management", "Resilience", "Self-Direction", "Prioritization"]
};

// Social Links
export const socialLinks = [
  {
    name: "GitHub",
    url: personalInfo.github,
    icon: "github"
  },
  {
    name: "LinkedIn",
    url: personalInfo.linkedin,
    icon: "linkedin"
  },
  {
    name: "Instagram",
    url: personalInfo.instagram,
    icon: "instagram"
  },
  {
    name: "Email",
    url: `mailto:${personalInfo.email}`,
    icon: "email"
  }
];
