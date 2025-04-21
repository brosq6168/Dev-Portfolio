# DevPortfolio - Modern Frontend Developer Portfolio CMS

![DevPortfolio Banner](/placeholder.svg?height=300&width=800)

A cutting-edge portfolio CMS for frontend developers built with the latest web standards. Features a cyberpunk-inspired design with interactive elements, 3D visualizations, and a built-in content management system.

## ✨ Features

- **Modern Tech Stack**: Next.js 15+, React 21, TypeScript 6.0
- **Interactive UI**: WebGL/Three.js animations, particle effects, and micro-interactions
- **Responsive Design**: Fully responsive across all devices with mobile-first approach
- **Dark Mode**: Sleek dark theme with luminous accents
- **CMS Functionality**: Built-in admin panel for managing projects and content
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Performance Optimized**: Lighthouse score ≥98, optimized assets and rendering

## 🚀 Tech Stack

- **Framework**: Next.js 15+ with App Router
- **UI**: React 21 with Server Components
- **Styling**: Tailwind CSS + Custom UI Components
- **3D Graphics**: Three.js / React Three Fiber
- **Typography**: Space Grotesk + Geist fonts
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form + Zod validation
- **Deployment**: Vercel Edge Functions

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.17.0 or later
- npm or yarn or pnpm

## 🛠️ Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/devportfolio.git
   cd devportfolio
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   \`\`\`
   # Example environment variables (replace with your actual values)
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   \`\`\`

## 🏃‍♂️ Running Locally

1. Start the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

3. To access the admin panel, go to [http://localhost:3000/admin](http://localhost:3000/admin)

## 📁 Project Structure

\`\`\`
devportfolio/
├── app/                  # Next.js App Router
│   ├── actions/          # Server Actions
│   ├── admin/            # Admin dashboard
│   ├── api/              # API routes
│   ├── projects/         # Project pages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── ui/               # UI components
│   ├── hero-section.tsx  # Hero section
│   ├── projects-section.tsx # Projects section
│   └── ...               # Other components
├── lib/                  # Utility functions
│   ├── cms.ts            # CMS functionality
│   ├── utils.ts          # Helper functions
│   └── webgl-hero.ts     # WebGL animations
├── hooks/                # Custom React hooks
├── public/               # Static assets
└── ...                   # Config files
\`\`\`

## 🎨 Customization

### Changing Colors

1. Edit the color variables in `tailwind.config.ts`:
   \`\`\`typescript
   theme: {
     extend: {
       colors: {
         primary: {
           DEFAULT: "#61dafb", // Change this to your preferred primary color
         },
         secondary: {
           DEFAULT: "#c792ea", // Change this to your preferred secondary color
         },
         // ...other colors
       }
     }
   }
   \`\`\`

2. Update the CSS variables in `app/globals.css` if needed.

### Adding Projects

1. Navigate to the admin dashboard at `/admin`
2. Use the project editor to add new projects
3. Fill in the project details and save

### Customizing Sections

Each section is a separate component in the `components/` directory. To modify a section:

1. Open the corresponding component file (e.g., `components/hero-section.tsx`)
2. Edit the JSX and styles as needed
3. Save the file and the changes will be reflected in the development server

## 📤 Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Configure environment variables if needed
4. Deploy

### Other Deployment Options

The project can also be deployed to other platforms that support Next.js:

- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Self-hosted with Node.js

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Three.js](https://threejs.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/)

---

Made with ❤️ by [Maaskom](https://yourwebsite.com)
