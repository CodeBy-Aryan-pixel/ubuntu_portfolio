# 🌐 Aryan Kamat — Ubuntu Web OS Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TensorFlow.js-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" alt="TensorFlow.js" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

<p align="center">
  An interactive, fully responsive, web-based operating system portfolio built with React.js and Tailwind CSS.
</p>

<p align="center">
  <a href="https://your-live-vercel-link-here.vercel.app/">
    <img src="https://img.shields.io/badge/🌐_Live_Portfolio-Visit_Now-E95420?style=for-the-badge" alt="Live Portfolio" />
  </a>
</p>

---

## 👨‍💻 About

Welcome to my interactive desktop environment portfolio.

Instead of a standard scrolling website, I engineered a fully functioning web-based OS inspired by Ubuntu. This project serves as a comprehensive showcase of my capabilities as a Software Engineer, combining complex state management, dynamic UI/UX design, and integrated AI models to deliver a highly memorable user experience.

The portfolio focuses on:

- ⚡ Complex state management (Window dragging, z-index focusing)
- 🤖 In-browser Machine Learning integration
- 🎨 Dynamic global CSS theming
- 🧩 Modular React component architecture
- 🔌 Simulated operating system mechanics
- 🚀 Fast and optimized performance

---

## ✨ Features

- 🖥️ **Window Management:** Custom drag, drop, maximize, and minimize logic for a true desktop feel.
- 🤖 **VisionLab AI:** Live in-browser object detection using TensorFlow.js (COCO-SSD).
- ⌨️ **Functional Terminal:** Custom CLI featuring simulated commands (`whoami`, `help`, `clear`).
- 🎨 **Dynamic Theming:** Change global accent colors instantly via the OS Settings menu.
- 🔌 **Boot & Shutdown:** Realistic Linux boot sequence and interactive power states.
- 📄 **Document Viewer:** Integrated resume viewing and downloading.
- 📱 **Responsive Design:** UI scales gracefully across both desktop and mobile devices.

---

## 🛠️ Tech Stack

### Frontend

- ⚛️ React.js
- 🎨 Tailwind CSS
- 🤖 TensorFlow.js (Machine Learning)
- 📦 Lucide React (Icons)
- HTML5 / CSS3 / JavaScript

### Deployment

- ▲ Vercel

### Development Tools

- Git & GitHub
- Vite
- npm
- VS Code

---

## 📂 Project Structure

```text
ubuntu_portfolio/
│
├── public/
│   ├── og-image.jpg
│   └── software_resume.pdf
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── apps/       # Terminal, VisionLab, Settings, etc.
│   │   ├── boot/       # Boot sequence animations
│   │   ├── desktop/    # Context menu, desktop icons, background
│   │   ├── dock/       # App drawer and navigation dock
│   │   ├── panel/      # Top status bar and drop-down menus
│   │   └── window/     # Draggable window wrapper components
│   ├── data/           # Portfolio projects and experience data
│   ├── hooks/          # Custom window management logic
│   ├── utils/          # Helper functions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
