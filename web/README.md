# Portfolio Website

A high-performance, visually stunning portfolio website built with modern web technologies. This project showcases a "Hacker/Cyberpunk" aesthetic combined with premium design principles, featuring advanced animations, 3D elements, and real-time data integration.

![Portfolio Preview](public/og-image.png) *Note: Add an og-image.png to your public folder for a preview.*

## 🚀 Tech Stack

This project leverages the latest tools in the React ecosystem to deliver a seamless and interactive user experience.

### Core
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) - The React Framework for the Web.
- **Language:** [TypeScript](https://www.typescriptlang.org/) - Strongly typed JavaScript.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework (using the latest alpha/beta features).

### Animation & UI
- **Animations:** [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library for React.
- **3D Graphics:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) & [Drei](https://github.com/pmndrs/drei) - React renderer for Three.js.
- **Smooth Scrolling:** [Lenis](https://github.com/studio-freight/lenis) - smooth scroll library.
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/).
- **Fonts:** Custom Google Fonts (Inter/Outfit/Serif) optimized with `next/font`.

### Data & Utilities
- **GitHub Data:** Custom fetch implementation + [React Activity Calendar](https://github.com/grubersjoe/react-activity-calendar).
- **Analytics:** [Vercel Analytics](https://vercel.com/analytics).
- **Linting:** ESLint with Next.js configuration.

---

## ✨ Features & UI Details

### Global UI Elements
- **Custom Cursor:** A custom-designed cursor (`components/CustomCursor.tsx`) that replaces the default browser cursor, likely adding a trailing effect or reactive state to enhance immersion.
- **Spotlight Effect:** A `Spotlight` component that tracks mouse movement, casting a subtle light or glow on the background to create depth and focus.
- **Smooth Scrolling:** Wrapped in a `SmoothScroll` component (powered by Lenis) to ensure a buttery-smooth scrolling experience across the entire application.
- **Noise Texture:** A global `noise-bg` overlay adds a film-grain texture, contributing to the premium/retro aesthetic.

### 1. Hero Section (`components/Hero.tsx`)
The landing experience is designed to make a bold statement immediately.
- **Visuals:** Features massive, viewport-responsive typography ("ANSHIT SHARMA") using **Playfair Display** (Serif) and **Outfit** (Sans) with `mix-blend-difference` for a striking contrast.
- **Animations:**
  - **Staggered Entrance:** Text and elements reveal themselves using a staggered timeline with `framer-motion`.
  - **Role Rotator:** A dynamic text component that cycles through different roles (e.g., "Developer", "Designer") to showcase versatility.
  - **Tech Background:** A subtle, animated background layer (likely particles or grid) that adds depth without distraction.
- **Interactions:** A bouncing "Scroll" indicator invites the user to explore further.

### 2. Selected Works (`components/SelectedWorks.tsx`)
A showcase of featured projects with a focus on interactivity and depth.
- **Layout:** Implements a **Sticky Scroll** effect where project cards stack on top of each other as the user scrolls down.
- **3D Tilt Effect:** Each project card responds to mouse movement with a 3D tilt effect, calculated using `useMotionValue` and `useTransform` to rotate the card based on cursor position.
- **Aesthetics:**
  - **Glassmorphism:** Cards use `backdrop-blur-xl` and semi-transparent borders (`zinc-800/50`) to blend with the background.
  - **Dynamic Gradients:** Hovering over a card reveals a project-specific color gradient (e.g., Blue/Purple for Finance, Emerald/Teal for Infrastructure).
  - **Micro-interactions:** Buttons and tags have subtle hover scales and color shifts.

### 3. Skills Universe (`components/Skills.tsx`)
A unique visualization of technical proficiency.
- **Concept:** Instead of a traditional list, skills are displayed in a 3D orbital system using `SkillsOrbit`.
- **Implementation:** Likely uses **React Three Fiber** or CSS 3D transforms to place icons (React, Node, Python, etc.) in a rotating sphere or orbit around a central point.
- **Visuals:** High-quality SVG icons from `react-icons` are used for crisp rendering on all devices.

### 4. Open Source / Contribution Graph (`components/ContributionGraph.tsx`)
A data-driven section highlighting open-source activity.
- **Real-time Data:** Fetches live data from the GitHub API to display:
  - **Contribution Graph:** A year-long heatmap of commits using `react-activity-calendar`.
  - **Stats:** Total Contributions, Current Streak, and Repository count.
- **Cyberpunk Aesthetic:**
  - **Scanlines:** An animated overlay creates a retro CRT/scanline effect over the graph.
  - **Glow Effects:** Radial gradients and borders glow with Emerald/Cyan hues to match the "Hacker" theme.
  - **Counting Animation:** Stat numbers animate from 0 to their final value using `framer-motion`'s `animate` function.

### 5. Experience & Contact
- **Experience:** A clean, timeline-based view of professional history.
- **Contact:** A functional area for potential collaborations, featuring social links (GitHub, LinkedIn, Mail) with hover effects.

---

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- **Node.js:** v18.17.0 or higher (required for Next.js 14+).
- **npm** or **yarn** or **pnpm**.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AnshitSharma/Portfolio.git
    cd Portfolio/web
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📂 Project Structure

```bash
web/
├── app/                 # Next.js App Router directory
│   ├── globals.css      # Global styles & Tailwind directives
│   ├── layout.tsx       # Root layout (fonts, metadata)
│   └── page.tsx         # Main landing page (composes all sections)
├── components/          # Reusable UI components
│   ├── Hero.tsx         # Landing section
│   ├── SelectedWorks.tsx# Projects showcase
│   ├── Skills.tsx       # Skills visualization
│   ├── ContributionGraph.tsx # GitHub stats
│   └── ...              # Other components
├── public/              # Static assets (images, svgs)
├── tailwind.config.ts   # Tailwind CSS configuration
└── package.json         # Dependencies and scripts
```

---

## 🚀 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Vercel will automatically detect Next.js and configure the build settings.
4.  **Environment Variables:** If you have any (e.g., for analytics or private APIs), add them in the Vercel dashboard.
5.  Click **Deploy**.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by [Anshit Sharma](https://github.com/AnshitSharma).
