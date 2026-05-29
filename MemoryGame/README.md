# Memory Game

A TypeScript-based interactive memory card game built with modern web technologies.

## 📋 Project Overview

Memory Game is a classic card-matching game where players flip cards to find matching pairs. The game features customizable characters, sound effects, and a scoring system to track game progress.

## 🎮 Features

- **Interactive Gameplay**: Click cards to reveal hidden images and find matching pairs
- **Character Selection**: Play with different character themes
- **Sound Effects**: Audio feedback for correct/incorrect matches
- **Game State Management**: Track game progress and statistics
- **Responsive Design**: Works on desktop and mobile devices
- **Score Tracking**: Keep track of your game performance

## 📁 Project Structure

```
MemoryGame/
├── index.html              # Main HTML file
├── main.ts                 # Entry point and game initialization
├── style.css               # Styling and responsive design
├── images/                 # Game assets and images
├── Interfaces/             # TypeScript interfaces
│   ├── ICard.ts           # Card interface definition
│   ├── ICharacter.ts      # Character interface definition
│   ├── IGame.ts           # Game interface definition
│   ├── IGameState.ts      # Game state interface definition
│   └── ISound.ts          # Sound interface definition
└── Models/                 # Model implementations
    ├── Card.ts            # Card class implementation
    ├── characters.ts      # Character definitions
    ├── Game.ts            # Game logic and management
    └── Sound.ts           # Sound management
```

## 🛠️ Technologies Used

- **TypeScript**: Type-safe JavaScript development
- **HTML5**: Semantic markup and canvas support
- **CSS3**: Modern styling and animations
- **Web Audio API**: Sound effect management

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- A modern web browser
- TypeScript compiler (or a TypeScript bundler)

### Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```bash
   cd MemoryGame
   ```

3. Install dependencies (if needed):
   ```bash
   npm install
   ```

### Building

To compile TypeScript files:

```bash
tsc
```

Or use a bundler like Webpack or Vite for production builds.

### Running

Simply open `index.html` in your web browser:

```bash
# Using a local server (recommended)
npx http-server
```

Then navigate to `http://localhost:8080` or open the file directly.

## 🎯 How to Play

1. **Start the Game**: Click the "Start Game" button to begin
2. **Flip Cards**: Click on any card to reveal its hidden image
3. **Find Matches**: Try to find matching pairs by remembering card positions
4. **Complete the Game**: Match all pairs to win
5. **View Score**: Check your performance statistics at the end

## 📚 Core Classes and Interfaces

### Interfaces
- `ICard`: Defines the structure of a game card
- `ICharacter`: Character theme configuration
- `IGame`: Main game interface
- `IGameState`: Current state of the game
- `ISound`: Audio effect management

### Models
- `Card`: Card logic and state management
- `Game`: Main game controller and logic
- `Sound`: Audio playback handler
- `characters`: Character definitions and themes

## 🎨 Customization

You can customize the game by:
- Adding new character themes in `Models/characters.ts`
- Modifying game rules in `Models/Game.ts`
- Updating styles in `style.css`
- Adding new sound effects to the `Models/Sound.ts`

## 🐛 Troubleshooting

- **Cards not appearing**: Check that image paths are correct in the `images/` directory
- **Sound not working**: Ensure browser permissions allow audio playback
- **TypeScript errors**: Run `tsc` to compile and check for type errors

## 📝 License

This project is created for educational purposes.

## 👤 Author

Eman Hamam

---

Enjoy playing the Memory Game! 🎮✨
