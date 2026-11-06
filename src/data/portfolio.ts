export const profile = {
  name: "Anak Agung Gede Pradnya Prameswara",
  shortName: "Pradnya Prameswara",
  role: "Fullstack Web Developer",
  location: "Gianyar, Bali, Indonesia",
  email: "agungpradnya7@gmail.com",
  linkedin: "https://www.linkedin.com/in/pradnyaprameswara/",
  github: "https://github.com/PradnyaPrameswara",
} as const

export const projects = [
  {
    slug: "widhi-asih-bali-export",
    name: "Widhi Asih Bali Export",
    category: "Company website",
    description: "Responsive product and catalog experience supported by a public product API.",
    role: "Web Developer",
    status: "Company project · source not publicly distributed",
    technologies: ["Astro", "React", "TypeScript", "Tailwind CSS", "REST API"],
    highlights: [
      "Developed and maintained responsive product and catalog interfaces.",
      "Integrated product data from the existing public API.",
      "Refactored reusable components and validated layouts across viewport sizes.",
    ],
  },
  {
    slug: "wedding-website",
    name: "Wedding Website",
    category: "Frontend reconstruction",
    description: "A Webflow-based visual design reconstructed as a modern responsive frontend.",
    role: "Frontend Developer",
    status: "Portfolio project",
    technologies: ["Astro", "React", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Rebuilt an existing Webflow design into structured frontend code.",
      "Preserved typography, spacing, imagery, and page composition.",
      "Implemented responsive behavior and checked visual consistency.",
    ],
  },
  {
    slug: "invoiceaura",
    name: "InvoiceAura",
    category: "Full-stack application",
    description: "Invoice, customer, payment, and approval workflows for administrative use.",
    role: "Fullstack Developer",
    status: "Personal project · ongoing development",
    technologies: ["Laravel", "PHP", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Built invoice, customer, item, payment, and approval workflows.",
      "Implemented validation, access control, and relational data handling.",
      "Added PDF exports and automated checks to reduce regressions.",
    ],
  },
] as const

export type Project = (typeof projects)[number]

export const experience = [
  { role: "Web Developer", company: "Widhi Asih Bali Export", period: "Jun 2026 – Present", location: "Gianyar, Bali" },
  { role: "Informatics Teaching Internship", company: "SMP Negeri 6 Singaraja", period: "Sep – Dec 2025", location: "Singaraja, Bali" },
] as const

export const expertise = [
  { name: "frontend", items: ["Astro", "React", "TypeScript", "Tailwind CSS", "Responsive UI"] },
  { name: "backend / data", items: ["Laravel", "PHP", "REST APIs", "PostgreSQL", "MySQL"] },
  { name: "workflow", items: ["Git / GitHub", "Testing", "CI checks", "Debugging"] },
] as const
