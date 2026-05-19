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
  instagram: "https://www.instagram.com/daji.env",
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
    period: "Temporary",
    title: "Experience Placeholder",
    company: "Temporary Node",
    location: "Manila, Philippines",
    type: "Placeholder",
    summary:
      "Temporary placeholder entry to help visualize the active experience network while the section layout is being finalized.",
    highlights: [
      "Use this temporary node to validate spacing, animation, and graph behavior.",
      "Replace this item with a real experience entry once the final content is ready.",
      "Keep the node structure intact so the graph remains balanced as more experiences are added."
    ],
    stack: ["TBD", "Port", "Layout", "UX", "Graph", "Animation", "Design"]
  },
  {
    id: 1,
    nodeNumber: 2,
    period: "Current Track",
    title: "BS Computer Science",
    company: "Pamantasan ng Lungsod ng Maynila",
    location: "Manila, Philippines",
    type: "Academic",
    summary:
      "Developing a strong software engineering foundation through systems thinking, disciplined problem-solving, and hands-on implementation.",
    highlights: [
      "Strengthening core fundamentals across algorithms, programming, and software design.",
      "Applying classroom concepts through independent builds, portfolio work, and iterative refinement.",
      "Building a workflow centered on clarity, precision, and deliberate execution."
    ],
    stack: ["Python", "Java", "C", "PostgreSQL"]
  },
  {
    id: 2,
    nodeNumber: 3,
    defaultActive: true,
    period: "Present",
    title: "Web Development Lead",
    company: "GDG on Campus PLM",
    location: "Manila, Philippines",
    type: "Leadership",
    summary:
      "Leading web-focused initiatives with an emphasis on structure, maintainability, and polished user-facing execution.",
    highlights: [
      "Support planning and delivery for student-led web projects and community initiatives.",
      "Translate direction into clean, consistent interfaces that feel intentional across screens.",
      "Help keep collaboration organized so builds stay thoughtful, scalable, and reliable."
    ],
    stack: ["React", "Next.js", "TypeScript", "Figma"]
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
