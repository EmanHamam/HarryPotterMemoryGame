import { Game } from "./Models/Game.js";
import { characters } from "./Models/characters.js";

const crestImg = "images/hogwarts-crest.jpg";

const game = new Game(characters, crestImg);
game.init();