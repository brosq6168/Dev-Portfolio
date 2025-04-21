"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { sendContactForm } from "@/app/actions/contact"
import { Loader2, Send, CheckCircle, Linkedin, Github, Twitter } from "lucide-react"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    try {
      const result = await sendContactForm(formData)

      if (result.success) {
        setIsSuccess(true)
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
          variant: "default",
        })

        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement
        form.reset()

        // Reset success state after 3 seconds
        setTimeout(() => {
          setIsSuccess(false)
        }, 3000)
      } else {
        throw new Error(result.error || "Something went wrong")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-space text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out and I'll get back to you as soon as
            possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glassmorphism p-8 rounded-lg"
          >
            <h3 className="font-space text-2xl font-bold mb-6">Contact Information</h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
                <p className="font-medium">mponinlennox@gmail.com</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Location</h4>
                <p className="font-medium">Nairobi, KE</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Availability</h4>
                <p className="font-medium">Open to freelance & full-time opportunities</p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Connect with me</h4>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full neon-border"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="h-5 w-5 text-primary" aria-hidden="true" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full neon-border" aria-label="GitHub profile">
                  <Github className="h-5 w-5 text-primary" aria-hidden="true" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full neon-border" aria-label="Twitter profile">
                  <Twitter className="h-5 w-5 text-primary" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glassmorphism p-8 rounded-lg"
          >
            <form id="contact-form" action={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="glassmorphism border-primary/30 focus:border-primary"
                    aria-required="true"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    required
                    className="glassmorphism border-primary/30 focus:border-primary"
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  required
                  className="glassmorphism border-primary/30 focus:border-primary"
                  aria-required="true"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  rows={5}
                  required
                  className="glassmorphism border-primary/30 focus:border-primary resize-none"
                  aria-required="true"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full btn-luminous"
                aria-live="polite"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                    Sent!
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
