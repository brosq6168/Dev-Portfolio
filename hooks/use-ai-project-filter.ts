"use client"

import { useState, useEffect } from "react"

type Project = {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  repoUrl: string
}

export function useAIProjectFilter(projects: Project[]) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // If search query is empty, show all projects
    if (!searchQuery.trim()) {
      setFilteredProjects(projects)
      return
    }

    // Simple client-side filtering without AI for now
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    )

    setFilteredProjects(filtered.length > 0 ? filtered : projects)
  }, [searchQuery, projects])

  return { filteredProjects, searchQuery, setSearchQuery, isLoading }
}
