"use server"

import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function sendContactForm(formData: FormData) {
  try {
    // Extract form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Validate form data
    const result = contactSchema.safeParse({
      name,
      email,
      subject,
      message,
    })

    if (!result.success) {
      return {
        success: false,
        error: result.error.errors[0].message,
      }
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real application, you would send the data to an API or email service
    console.log("Contact form submission:", { name, email, subject, message })

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error sending contact form:", error)
    return {
      success: false,
      error: "Failed to send message. Please try again later.",
    }
  }
}
