"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAIProjectFilter } from "@/hooks/use-ai-project-filter"

type Project = {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  repoUrl: string
}

const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Dashboard",
    description:
      "A modern dashboard for e-commerce analytics with real-time data visualization and AI-powered insights.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Three.js", "AI"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "2",
    title: "AI Content Generator",
    description:
      "An AI-powered content generator that creates blog posts, social media content, and more using the latest LLMs.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Vercel AI SDK", "TypeScript", "Tailwind CSS"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "3",
    title: "3D Product Configurator",
    description: "A WebGL-based 3D product configurator that allows users to customize products in real-time.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Three.js", "React", "TypeScript", "WebGL"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "4",
    title: "Crypto Dashboard",
    description:
      "A real-time cryptocurrency dashboard with price tracking, portfolio management, and predictive analytics.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "API"],
    demoUrl: "#",
    repoUrl: "#",
  },
]

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("All")
  const { filteredProjects, searchQuery, setSearchQuery } = useAIProjectFilter(projects)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const allTags = Array.from(new Set(projects.flatMap((project) => project.tags)))

  const filters = ["All", ...allTags]

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-space text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore my latest work showcasing modern web development techniques, interactive experiences, and
            cutting-edge technologies.
          </p>

          <div className="flex flex-col gap-4">
            <div className="relative max-w-md mx-auto">
              <label htmlFor="project-search" className="sr-only">
                Search projects
              </label>
              <input
                id="project-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full px-4 py-2 rounded-lg glassmorphism border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary"
                aria-label="Search projects"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter)}
                  className={cn("rounded-full", activeFilter === filter ? "btn-luminous" : "hover:text-primary")}
                  aria-pressed={activeFilter === filter}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group"
              >
                <Card className="glassmorphism overflow-hidden h-full flex flex-col transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="relative overflow-hidden">
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt=""
                        className={cn(
                          "w-full h-48 object-cover transition-transform duration-500",
                          hoveredProject === project.id ? "scale-105" : "scale-100",
                        )}
                        aria-hidden="true"
                      />
                    </div>
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-background to-transparent"
                      aria-hidden="true"
                    />

                    {/* Simple animation effects that work across browsers */}
                    {hoveredProject === project.id && (
                      <>
                        <div className="absolute top-4 right-4 w-8 h-8">
                          <div className="w-full h-full rounded-full bg-primary animate-pulse opacity-70" />
                        </div>
                        <div className="absolute bottom-4 left-4 w-6 h-6">
                          <div className="w-full h-full rounded-full bg-secondary animate-pulse opacity-70" />
                        </div>
                      </>
                    )}
                  </div>

                  <CardHeader>
                    <CardTitle className="font-space text-xl flex items-center gap-2">
                      {project.title}
                      <ArrowUpRight
                        className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-secondary/50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between">
                    <Button variant="ghost" size="sm" className="hover:text-primary" asChild>
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View demo for ${project.title}`}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                        Demo
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:text-primary" asChild>
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View code for ${project.title}`}
                      >
                        <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                        Code
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p>No projects found matching your search criteria.</p>
              <Button onClick={() => setSearchQuery("")} className="mt-4 btn-luminous">
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
