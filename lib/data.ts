// Personal Information
export const personalInfo = {
  name: "Daniel Camacho",
  role: "Software Developer",
  tagline: "Structured, thoughtful, and a little obsessive about detail.",
  bio: `I build software that balances logic and design.
Each project reflects my belief that clarity and efficiency create the most meaningful results.`,
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
    title: "Precision Architect",
    description: "Focused on building structured, reliable systems through clarity, logic, and intent."
  },
  {
    title: "Human-Centered Developer",
    description: "Creating meaningful impact through clean, intentional design."
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
        title: "TBA",
        description: "Currently focusing on academic commitments; project details will be provided once available.",
        tags: ["TBA"],
        github: personalInfo.github,
        demo: personalInfo.github,
        featured: true
    },
    {
        id: 2,
        title: "TBA",
        description: "Currently focusing on academic commitments; project details will be provided once available.",
        tags: ["TBA"],
        github: personalInfo.github,
        demo: personalInfo.github,
        featured: true
    },
    {
        id: 3,
        title: "TBA",
        description: "Currently focusing on academic commitments; project details will be provided once available.",
        tags: ["TBA"],
        github: personalInfo.github,
        demo: personalInfo.github,
        featured: true
    },
    {
        id: 4,
        title: "TBA",
        description: "Currently focusing on academic commitments; project details will be provided once available.",
        tags: ["TBA"],
        github: personalInfo.github,
        demo: personalInfo.github
    },
    {
        id: 5,
        title: "TBA",
        description: "Currently focusing on academic commitments; project details will be provided once available.",
        tags: ["TBA"],
        github: personalInfo.github,
        demo: personalInfo.github
    },
    {
        id: 6,
        title: "Easter Egg",
        description: "Wow. Still here? You must be really curious",
        tags: ["Hello World"],
        github: personalInfo.instagram,
        demo: personalInfo.instagram
    }
];

// Skills/Tools
export const skills = {
  languages: ["Python", "JavaScript", "TypeScript", "Java", "C"],
  frontend: ["React", "Next.js", "Tailwind CSS"],
  backend: ["Node.js", "Express", "FastAPI", "PostgreSQL", "MongoDB"],
  tools: ["Git", "Figma", "Vercel", "AWS", "GCP"]
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

// Experience
export interface Experience {
  id: number;
  node: string;
  category: string;
  title: string;
  subtitle: string;
  location: string;
  period: string;
  company: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    node: "NODE 01",
    category: "LEADERSHIP",
    title: "Web Development Lead",
    subtitle: "GDG on Campus PLM",
    location: "Manila, Philippines",
    period: "2024 — Present",
    company: "Google Developer Groups",
    summary:
      "Led frontend implementation and mentoring initiatives for student-built web experiences, keeping quality standards high while helping the team ship consistently.",
    highlights: [
      "Directed frontend architecture and code reviews for campus initiatives",
      "Mentored members in React and Next.js development workflows",
      "Improved delivery consistency through clearer implementation planning",
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: 2,
    node: "NODE 02",
    category: "ENGINEERING",
    title: "Frontend Developer",
    subtitle: "Academic & Personal Projects",
    location: "Remote",
    period: "2023 — Present",
    company: "Independent",
    summary:
      "Built responsive, accessibility-aware interfaces with a strong focus on clarity, consistency, and maintainable component systems.",
    highlights: [
      "Designed reusable UI patterns to speed up feature delivery",
      "Implemented responsive layouts with stronger visual hierarchy",
      "Maintained clean component boundaries for easier iteration",
    ],
    stack: ["React", "TypeScript", "Framer Motion", "Figma"],
  },
  {
    id: 3,
    node: "NODE 03",
    category: "BACKEND",
    title: "Full-Stack Contributor",
    subtitle: "Collaborative Team Projects",
    location: "Manila, Philippines",
    period: "2022 — 2024",
    company: "University Teams",
    summary:
      "Contributed to end-to-end features, supporting backend APIs and frontend integration while preserving predictable performance and readable code.",
    highlights: [
      "Built API-integrated features from database to UI",
      "Collaborated on sprint-based delivery and release handoff",
      "Documented implementation details to reduce onboarding time",
    ],
    stack: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
  },
];
