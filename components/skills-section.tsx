"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Skill = {
  name: string
  category: "frontend" | "backend" | "design" | "tools"
  level: number // 1-10
}

const skills: Skill[] = [
  { name: "React", category: "frontend", level: 9 },
  { name: "Next.js", category: "frontend", level: 8 },
  { name: "TypeScript", category: "frontend", level: 8 },
  { name: "Tailwind CSS", category: "frontend", level: 9 },
  { name: "Three.js", category: "frontend", level: 7 },
  { name: "Node.js", category: "backend", level: 6 },
  { name: "GraphQL", category: "backend", level: 5 },
  { name: "Figma", category: "design", level: 7 },
  { name: "Git", category: "tools", level: 8 },
  { name: "WebGL", category: "frontend", level: 6 },
  { name: "CSS", category: "frontend", level: 9 },
  { name: "HTML", category: "frontend", level: 10 },
  { name: "JavaScript", category: "frontend", level: 9 },
  { name: "Vercel", category: "tools", level: 8 },
  { name: "Framer Motion", category: "frontend", level: 7 },
]

export function SkillsSection() {
  const categories = ["frontend", "backend", "design", "tools"]

  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-space text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my technical expertise across various domains of web development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Skill Visualization - Simplified version without Three.js */}
          <div className="glassmorphism rounded-lg overflow-hidden p-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill) => {
                // Determine color based on category
                let colorClass
                switch (skill.category) {
                  case "frontend":
                    colorClass = "text-primary border-primary/50"
                    break
                  case "backend":
                    colorClass = "text-secondary border-secondary/50"
                    break
                  case "design":
                    colorClass = "text-orange-400 border-orange-400/50"
                    break
                  case "tools":
                    colorClass = "text-blue-400 border-blue-400/50"
                    break
                  default:
                    colorClass = "text-foreground border-foreground/50"
                }

                // Scale font size based on skill level (1rem to 1.5rem)
                const fontSize = 1 + skill.level / 20

                return (
                  <motion.div
                    key={skill.name}
                    className={`border rounded-full px-3 py-1 ${colorClass}`}
                    style={{ fontSize: `${fontSize}rem` }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {skill.name}
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="glassmorphism h-full">
                    <CardContent className="p-6">
                      <h3 className="font-space text-lg font-bold mb-4 capitalize">{category}</h3>

                      <div className="flex flex-wrap gap-2">
                        {skills
                          .filter((skill) => skill.category === category)
                          .sort((a, b) => b.level - a.level)
                          .map((skill) => (
                            <Badge
                              key={skill.name}
                              variant="outline"
                              className={cn(
                                "py-1.5",
                                skill.level >= 8 && "border-primary/50",
                                skill.level < 8 && skill.level >= 6 && "border-primary/30",
                                skill.level < 6 && "border-muted",
                              )}
                            >
                              {skill.name}
                              <span className="ml-1.5 text-xs opacity-70">{skill.level}/10</span>
                            </Badge>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
