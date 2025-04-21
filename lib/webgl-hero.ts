// Simplified version to avoid potential issues
export function initHeroCanvas(canvas: HTMLCanvasElement) {
  // Basic canvas setup with 2D context instead of WebGL
  const ctx = canvas.getContext("2d")
  if (!ctx) return () => {}

  // Set canvas dimensions
  const setCanvasSize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  setCanvasSize()
  window.addEventListener("resize", setCanvasSize)

  // Create a simple gradient background
  const drawGradient = () => {
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "rgba(97, 218, 251, 0.2)") // Primary color with opacity
    gradient.addColorStop(1, "rgba(199, 146, 234, 0.2)") // Secondary color with opacity

    // Fill with gradient
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add some particles
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = Math.random() * 2 + 1

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = Math.random() > 0.5 ? "#61dafb" : "#c792ea"
      ctx.fill()
    }

    // Animation loop
    requestAnimationFrame(drawGradient)
  }

  // Start animation
  drawGradient()

  // Cleanup function
  return () => {
    window.removeEventListener("resize", setCanvasSize)
  }
}
