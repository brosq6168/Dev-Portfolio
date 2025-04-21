"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Save, Trash } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { getAllProjects, saveProject, deleteProject } from "@/lib/cms"
import type { Project } from "@/lib/cms"

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    content: "",
    image: "",
    tags: [],
    demoUrl: "",
    repoUrl: "",
    featured: false,
    date: new Date().toISOString(),
  })
  const [newTag, setNewTag] = useState("")
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  // Load projects
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const allProjects = await getAllProjects()
        setProjects(allProjects)
      } catch (error) {
        console.error("Error loading projects:", error)
        toast({
          title: "Error",
          description: "Failed to load projects",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [toast])

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentProject((prev) => ({ ...prev, [name]: value }))
  }

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setCurrentProject((prev) => ({ ...prev, [name]: checked }))
  }

  // Add a new tag
  const addTag = () => {
    if (newTag.trim() && !currentProject.tags?.includes(newTag.trim())) {
      setCurrentProject((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()],
      }))
      setNewTag("")
    }
  }

  // Remove a tag
  const removeTag = (tag: string) => {
    setCurrentProject((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tag) || [],
    }))
  }

  // Save the current project
  const saveCurrentProject = async () => {
    if (!currentProject.title || !currentProject.description) {
      toast({
        title: "Validation Error",
        description: "Title and description are required",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    try {
      const savedProject = await saveProject(currentProject as any)

      if (currentProject.id) {
        // Update existing project
        setProjects((prev) => prev.map((p) => (p.id === savedProject.id ? savedProject : p)))
        toast({
          title: "Success",
          description: "Project updated successfully",
        })
      } else {
        // Add new project
        setProjects((prev) => [...prev, savedProject])
        toast({
          title: "Success",
          description: "Project created successfully",
        })
      }

      // Reset form for new project
      setCurrentProject({
        title: "",
        description: "",
        content: "",
        image: "",
        tags: [],
        demoUrl: "",
        repoUrl: "",
        featured: false,
        date: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Error saving project:", error)
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  // Delete a project
  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return
    }

    try {
      await deleteProject(id)
      setProjects((prev) => prev.filter((p) => p.id !== id))
      toast({
        title: "Success",
        description: "Project deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting project:", error)
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      })
    }
  }

  // Edit a project
  const editProject = (project: Project) => {
    setCurrentProject(project)
  }

  // Create a new project
  const newProject = () => {
    setCurrentProject({
      title: "",
      description: "",
      content: "",
      image: "",
      tags: [],
      demoUrl: "",
      repoUrl: "",
      featured: false,
      date: new Date().toISOString(),
    })
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Portfolio CMS Admin</h1>

      <Tabs defaultValue="projects">
        <TabsList className="mb-6">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="editor">Editor</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">All Projects</h2>
            <Button onClick={newProject}>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <Card key={project.id} className="glassmorphism">
                  <CardHeader className="pb-2">
                    <CardTitle>{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags?.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => handleDeleteProject(project.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                      <Button variant="default" size="sm" onClick={() => editProject(project)}>
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {projects.length === 0 && (
                <div className="col-span-full text-center py-10 text-muted-foreground">
                  No projects found. Create your first project!
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="editor">
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>{currentProject.id ? "Edit Project" : "New Project"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Title</label>
                  <Input
                    name="title"
                    value={currentProject.title || ""}
                    onChange={handleChange}
                    placeholder="Project title"
                    className="glassmorphism border-primary/30"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Description</label>
                  <Textarea
                    name="description"
                    value={currentProject.description || ""}
                    onChange={handleChange}
                    placeholder="Short project description"
                    className="glassmorphism border-primary/30"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Content (Markdown)</label>
                  <Textarea
                    name="content"
                    value={currentProject.content || ""}
                    onChange={handleChange}
                    placeholder="Project content in Markdown format"
                    rows={10}
                    className="glassmorphism border-primary/30 font-mono"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Image URL</label>
                  <Input
                    name="image"
                    value={currentProject.image || ""}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="glassmorphism border-primary/30"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Tags</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      className="glassmorphism border-primary/30"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTag()
                        }
                      }}
                    />
                    <Button onClick={addTag} type="button">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.tags?.map((tag) => (
                      <Badge key={tag} variant="outline" className="cursor-pointer" onClick={() => removeTag(tag)}>
                        {tag} &times;
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Demo URL</label>
                    <Input
                      name="demoUrl"
                      value={currentProject.demoUrl || ""}
                      onChange={handleChange}
                      placeholder="https://example.com"
                      className="glassmorphism border-primary/30"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Repository URL</label>
                    <Input
                      name="repoUrl"
                      value={currentProject.repoUrl || ""}
                      onChange={handleChange}
                      placeholder="https://github.com/username/repo"
                      className="glassmorphism border-primary/30"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={currentProject.featured || false}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-primary/30 text-primary focus:ring-primary"
                  />
                  <label htmlFor="featured" className="text-sm font-medium">
                    Featured Project
                  </label>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <Button variant="outline" onClick={newProject} disabled={saving}>
                    Cancel
                  </Button>
                  <Button onClick={saveCurrentProject} disabled={saving}>
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Project
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
