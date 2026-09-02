// Personal Information
export const personalInfo = {
  name: "Daniel Camacho",
  role: "Software Developer",
  tagline: "Structured, thoughtful, and a little obsessive about detail.",
  bio: "I'm a software engineer focused on building practical, well-crafted solutions. I enjoy transforming ideas into products that are intuitive, reliable, and meaningful. Every project is an opportunity to learn, improve, and create something worth using.",
  email: "danielcamacho0416@gmail.com",
  github: "https://github.com/DanielHC16",
  linkedin: "https://linkedin.com/in/danielcamacho777",
  instagram: "https://www.instagram.com/hardi.cc",
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
  role?: string;
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
    role: "Language Designer & Core Developer",
    description: "A high-level, statically typed procedural language and compiler designed around strict clarity, readable syntax, and precise execution.",
    tags: ["Python", "TypeScript", "FastAPI", "Compiler Design", "Automata"],
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
    role: "Project Lead & Backend Developer",
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
    id: 5,
    title: "Enhanced GCN Vulnerability Prediction System",
    role: "ML Researcher and Core Developer",
    description: "A graph-based system that uses an enhanced Graph Convolutional Network (GCN) to predict vulnerabilities in the rice supply chain under climate and demand shocks.",
    tags: ["GCN", "Machine Learning", "Supply Chain", "Thesis", "Ongoing"],
    image: {
      src: "/projects/GCN-system.png",
      alt: "Enhanced GCN system preview"
    },
    images: [
      {
        src: "/projects/GCN-system.png",
        alt: "Enhanced GCN system preview"
      }
    ],
    links: {
      github: "https://github.com/DanielHC16/gcn-enhanced-vulnerability-system"
    }
  },
  {
    id: 3,
    title: "MEDIC: Monitoring For Elderly Daily Intervention & Care",
    role: "Full-Stack Developer & AI Systems Engineer",
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
    role: "Lead Backend Developer",
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
      github: "https://github.com/DanielHC16/Smart-Multi-Institute-Queuing-System"
    }
  },
  {
    id: 6,
    title: "PayFlow",
    role: "Full-Stack Developer & AI Integration Engineer",
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
    role: "Mobile Developer",
    description: "TALLY is a gamified platform that bridges the financial literacy gap in the Philippines by making money management fun and engaging for the youth.",
    tags: ["FlutterFlow", "Hackathon Winner", "Fintech", "MVP"],
    image: {
      src: "/projects/TALLY.png",
      alt: "TALLY financial literacy project preview"
    },
    images: [
      {
        src: "/projects/TALLY.png",
        alt: "TALLY financial literacy project preview"
      }
    ],
    links: {
      github: "https://github.com/timtulang/Tally",
      demo: "https://devpost.com/software/tally-teach-and-learn-life-yields#/"
    }
  },
  {
    id: 9,
    title: "SaaSified and Amplified: PHSW x PLM Event Website",
    role: "Frontend Developer",
    description: "SaaSified and Amplified: Ascending Software to the Sky is a GDGoC PLM and Philippine Startup Week 2025 keynote focused on scaling Filipino software innovation globally.",
    tags: ["React", "Tailwind CSS", "Vercel"],
    image: {
      src: "/projects/PHSW.png",
      alt: "SaaSified and Amplified event website preview"
    },
    images: [
      {
        src: "/projects/PHSW.png",
        alt: "SaaSified and Amplified event website preview"
      }
    ],
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
    period: "2017 - 2023",
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
    stack: ["MS Office", "Canva", "Photoshop", "Research", "Time Management", "Writing"]
  },
  {
    id: 1,
    nodeNumber: 2,
    period: "Jul 2024 - Jul 2026",
    title: "Cloud & Technical Projects Contributor",
    company: "AWS Student Builder Group - Haribon",
    location: "Manila, Philippines (Hybrid)",
    type: "Academic Organization",
    summary:
      "Contributed to community technical projects, workshops, and cloud initiatives, bridging foundational academic concepts with hands-on AWS workflows and SDLC practices.",
    highlights: [
      "Delivered a technical workshop to 200+ attendees, speaking on Amazon S3 and practical workflows within the AWS ecosystem.",
      "Applied Software Development Life Cycle (SDLC) methodologies across collaborative engineering workflows.",
      "Engaged in technical leadership and peer mentoring to foster cloud adoption within the student community."
    ],
    stack: ["AWS", "Amazon S3", "Cloud", "SDLC", "Frontend", "Backend"]
  },
  {
    id: 2,
    nodeNumber: 3,
    period: "Jul 2025 - Jul 2026",
    title: "Inner Source Developer",
    company: "DEVCON Philippines",
    location: "Manila, Philippines (Hybrid)",
    type: "Seasonal Community",
    summary:
      "Contributed to seasonal community tasks and internal tooling, exploring inner source workflows and web development tools in a hybrid setup.",
    highlights: [
      "Practiced inner source collaboration and shared coding workflows across hybrid team members.",
      "Explored and utilized frontend and backend tools to support internal community tasks and projects.",
      "Participated in community discussions and knowledge sharing with fellow developers."
    ],
    stack: ["InnerSource", "Open Source", "Frontend", "Backend", "Git", "Community"]
  },
  {
    id: 3,
    nodeNumber: 4,
    period: "2025 - 2026",
    title: "Web Development Lead",
    company: "Google Developer Groups on Campus - PLM",
    location: "Manila, Philippines",
    type: "Academic Organization",
    summary:
      "Led web development projects and seminars, guiding team execution, technical direction, and delivery of responsive, scalable web applications.",
    highlights: [
      "Led a 10 person developer team, managing communication, task distribution, and technical alignment across projects.",
      "Ensured strict deadline adherence through structured planning, sprint coordination, and progress tracking.",
      "Facilitated technical seminars to improve team skills and development practices."
    ],
    stack: ["React", "Next.js", "Leadership", "Git", "Agile", "TypeScript"]
  },
  {
    id: 4,
    nodeNumber: 5,
    defaultActive: true,
    period: "June 2026 - Present",
    title: "Fullstack Software Engineer Intern",
    company: "Aboitiz Foods",
    location: "Makati, Metro Manila",
    type: "Internship",
    summary:
      "Develop full-stack enterprise applications and AI-driven internal tools, delivering production-ready features across multiple business units.",
    highlights: [
      "Engineered full-stack enterprise web applications using NestJS across 4 manufacturing sites.",
      "Integrated Gemini AI solutions into enterprise workflows to automate internal operations.",
      "Collaborated directly with business stakeholders to gather requirements, deliver tailored solutions, and present project outcomes.",
      "Applied end-to-end SDLC best practices in a fast-paced Agile environment, utilizing Scrum ceremonies to align technical execution with stakeholder requirements."
    ],
    stack: ["React", "Gemini AI", "NestJS", "Node.js", "TypeScript", "SDLC"]
  }
];

// Skills/Tools
export const skills = {
  languages: ["Python", "JavaScript", "TypeScript", "Java", "C"],
  frontend: ["React", "Next.js", "Tailwind CSS", "Jquery"],
  backend: ["Node.js", "NestJS", "Express", "FastAPI", "PostgreSQL", "SQLite", "NeonDB"],
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
