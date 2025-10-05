# 🚀 Mars Homestead - Interactive Mars Habitat Builder

![Mars Homestead Game](https://img.shields.io/badge/Mars-Homestead-red?style=for-the-badge&logo=rocket)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?style=flat-square&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square&logo=node.js)

## 🎮 About The Game

**Mars Homestead** is an interactive web-based simulation game where players design and build sustainable Mars habitats. Strategic resource management meets creative building in this educational space colonization experience.

### 🌟 Features

- **🏗️ Interactive Building**: Drag-and-drop interface for placing habitat modules
- **⚡ Real-time Resources**: Live management of oxygen, power, water, and food
- **🎯 Strategic Planning**: Balance resource production vs. consumption
- **🎨 Beautiful UI**: Mars-themed design with smooth animations
- **🔊 Audio Feedback**: Procedurally generated sound effects
- **💾 Save System**: Auto-save with undo/redo functionality

### 🏢 Available Buildings

| Building | Function | Resource Impact |
|----------|----------|----------------|
| 🏠 Habitat Dome | Living space | O₂: +5, Power: -10 |
| ⚡ Solar Panel | Energy generation | Power: +25 |
| 🛏️ Living Quarters | Crew quarters | All: -2 to -5 |
| 🌱 Plant Pod | Food & oxygen | O₂: +10, Food: +15, Power: -8, Water: -10 |
| 💧 Water Tank | Water storage | Water: +20, Power: -3 |

## 🚀 Live Demo

**[Play Mars Homestead →](https://your-domain.com)** *(Coming soon!)*

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Build**: Vite, ESBuild
- **UI**: Radix UI, Lucide React
- **Deployment**: Railway

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 20.x or higher
- npm 8.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Othman-Mohammed/mars-homestead-game.git
cd mars-homestead-game

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎮 How to Play

1. **Start Building**: Select buildings from the inventory panel
2. **Place Strategically**: Click on the Mars surface to place structures
3. **Monitor Resources**: Watch the resource bar at the top
4. **Plan Expansion**: Balance power generation with life support needs
5. **Survive & Thrive**: Keep all resources above zero to maintain your colony

### 🎹 Controls

- **Mouse**: Click to select, drag to move buildings
- **R**: Rotate selected building
- **Delete**: Remove selected building
- **G**: Toggle grid snap
- **Ctrl+Z/Y**: Undo/Redo actions

## 📂 Project Structure

```
mars-homestead-game/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── lib/           # Game logic
│   │   └── pages/         # Game pages
├── server/                # Express backend
├── shared/                # Shared types
└── dist/                  # Production build
```

## 🚀 Deployment

This app is configured for easy deployment on Railway:

1. Connect your GitHub repository to Railway
2. Set environment variables:
   - `NODE_ENV=production`
3. Railway will automatically build and deploy

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Othman Mohammed**
- GitHub: [@Othman-Mohammed](https://github.com/Othman-Mohammed)

## 🙏 Acknowledgments

- Mars surface imagery courtesy of NASA
- Built with love for space exploration education
- Inspired by the challenges of Mars colonization

---

**Ready to colonize Mars? [Start Building →](https://your-domain.com)**