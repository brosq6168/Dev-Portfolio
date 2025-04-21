import { z } from "zod"

// Define the content types
export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string().optional(),
  image: z.string(),
  tags: z.array(z.string()),
  demoUrl: z.string().optional(),
  repoUrl: z.string().optional(),
  featured: z.boolean().optional(),
  date: z.string(),
})

export type Project = z.infer<typeof projectSchema>

// Mock data for projects
const mockProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Dashboard",
    description:
      "A modern dashboard for e-commerce analytics with real-time data visualization and AI-powered insights.",
    content: "# E-Commerce Dashboard\n\nThis is a detailed description of the e-commerce dashboard project.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Three.js", "AI"],
    demoUrl: "#",
    repoUrl: "#",
    featured: true,
    date: "2025-01-15",
  },
  {
    id: "2",
    title: "AI Content Generator",
    description:
      "An AI-powered content generator that creates blog posts, social media content, and more using the latest LLMs.",
    content: "# AI Content Generator\n\nThis is a detailed description of the AI content generator project.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Vercel AI SDK", "TypeScript", "Tailwind CSS"],
    demoUrl: "#",
    repoUrl: "#",
    featured: true,
    date: "2025-02-20",
  },
  {
    id: "3",
    title: "3D Product Configurator",
    description: "A WebGL-based 3D product configurator that allows users to customize products in real-time.",
    content: "# 3D Product Configurator\n\nThis is a detailed description of the 3D product configurator project.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Three.js", "React", "TypeScript", "WebGL"],
    demoUrl: "#",
    repoUrl: "#",
    featured: false,
    date: "2025-03-10",
  },
]

// Get all projects
export async function getAllProjects(): Promise<Project[]> {
  // In a real application, this would fetch from a database or file system
  return mockProjects
}

// Get a single project by ID
export async function getProjectById(id: string): Promise<Project | null> {
  // In a real application, this would fetch from a database or file system
  const project = mockProjects.find((p) => p.id === id)
  return project || null
}

// Create or update a project
export async function saveProject(project: Omit<Project, "id"> & { id?: string }): Promise<Project> {
  // In a real application, this would save to a database or file system
  const id = project.id || Date.now().toString()

  // For demo purposes, we'll just return the project with the ID
  return {
    ...project,
    id,
    content: project.content || "",
  }
}

// Delete a project
export async function deleteProject(id: string): Promise<boolean> {
  // In a real application, this would delete from a database or file system
  return true
}

// Convert markdown to HTML
export async function markdownToHtml(markdown: string): Promise<string> {
  // In a real application, this would use a markdown parser
  // For now, we'll just wrap paragraphs in <p> tags
  return markdown
    .split("\n\n")
    .map((p) => `<p>${p}</p>`)
    .join("")
}

// Generate OG image for a project
export async function generateOgImage(project: Project): Promise<string> {
  // In a real implementation, this would use a service like Vercel OG Image
  // For now, we'll return a placeholder
  return `/api/og?title=${encodeURIComponent(project.title)}`
}
