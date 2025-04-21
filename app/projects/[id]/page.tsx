import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { getProjectById, markdownToHtml } from "@/lib/cms"
import Link from "next/link"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} | MarrsPortfolio`,
    description: project.description,
    openGraph: {
      title: `${project.title} | MarrsPortfolio`,
      description: project.description,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(project.title)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id)

  if (!project) {
    notFound()
  }

  const contentHtml = await markdownToHtml(project.content || "")

  return (
    <main className="min-h-screen py-20">
      <div className="container max-w-4xl mx-auto px-4">
        <Link
          href="/#projects"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all projects
        </Link>

        <div className="relative rounded-lg overflow-hidden mb-8">
          <img
            src={project.image || "/placeholder.svg?height=600&width=1200"}
            alt={project.title}
            className="w-full h-[300px] md:h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <h1 className="font-space text-3xl md:text-4xl font-bold mb-4 neon-glow">{project.title}</h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="neon-border-secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <p className="text-lg text-muted-foreground mb-8">{project.description}</p>

        <div className="flex flex-wrap gap-4 mb-12">
          {project.demoUrl && (
            <Button asChild>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Demo
              </a>
            </Button>
          )}

          {project.repoUrl && (
            <Button variant="outline" asChild>
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View Code
              </a>
            </Button>
          )}
        </div>

        <div className="glassmorphism rounded-lg p-6 md:p-8 prose prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </div>
    </main>
  )
}
