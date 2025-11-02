// Personal Information
export const personalInfo = {
  name: "Daniel Camacho",
  role: "Software Engineer",
  tagline: "Structured, thoughtful, and a little obsessive about detail.",
  bio: `I'm a software engineer passionate about creating minimalist, functional applications. 
  My work focuses on clean architecture, user-centric design, and writing code that's as elegant as it is efficient.`,
  email: "danielcamacho0416@gmail.com",
  github: "https://github.com/DanielHC16",
  linkedin: "https://linkedin.com/in/danielcamacho777",
  instagram: "https://instagram.com/https.hajin",
};

// About Me Points
export const aboutPoints = [
  {
    title: "Problem Solver",
    description: "Analytical approach to complex challenges with elegant solutions"
  },
  {
    title: "Clean Code Advocate",
    description: "Writing maintainable, scalable, and well-documented code"
  },
  {
    title: "Continuous Learner",
    description: "Always exploring new technologies and best practices"
  }
];

// Projects
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Project One",
    description: "A full-stack application with modern architecture and clean design principles",
    tags: ["React", "Node.js", "TypeScript"],
    github: "https://github.com/dcamacho/project-one",
    demo: "https://project-one.demo",
    featured: true
  },
  {
    id: 2,
    title: "Project Two",
    description: "Minimalist portfolio generator with customizable themes and layouts",
    tags: ["Next.js", "Tailwind", "Vercel"],
    github: "https://github.com/dcamacho/project-two",
    featured: true
  },
  {
    id: 3,
    title: "Project Three",
    description: "API service with comprehensive documentation and testing suite",
    tags: ["Python", "FastAPI", "PostgreSQL"],
    github: "https://github.com/dcamacho/project-three",
    featured: true
  },
  {
    id: 4,
    title: "Project Four",
    description: "Mobile-first web application with responsive design and accessibility",
    tags: ["React Native", "Firebase", "Redux"],
    github: "https://github.com/dcamacho/project-four"
  },
  {
    id: 5,
    title: "Project Five",
    description: "CLI tool for automating development workflows and deployment",
    tags: ["Go", "Docker", "CI/CD"],
    github: "https://github.com/dcamacho/project-five"
  },
  {
    id: 6,
    title: "Project Six",
    description: "Data visualization dashboard with real-time analytics",
    tags: ["D3.js", "WebSocket", "Express"],
    github: "https://github.com/dcamacho/project-six"
  }
];

// Skills/Tools
export const skills = {
  languages: ["Python", "JavaScript", "TypeScript", "Java", "C"],
  frontend: ["React", "Next.js", "Tailwind CSS", "", ""],
  backend: ["Node.js", "Express", "FastAPI", "PostgreSQL", "MongoDB",],
  tools: ["Git", /*"Docker"*/, "Figma", "Vercel", "AWS", "GCP"]
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
