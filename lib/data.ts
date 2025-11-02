// Personal Information
export const personalInfo = {
  name: "Daniel Camacho",
  role: "Software Engineer",
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
