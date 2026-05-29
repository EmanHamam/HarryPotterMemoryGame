import type { IGame } from "../Interfaces/IGame.js";
import type { IGameState } from "../Interfaces/IGameState.js";
import type { ICharacter } from "../Interfaces/ICharacter.js";
import { Card } from "../Models/Card.js";
import { Sound } from "./Sound.js";

export class Game implements IGame {
   totalPairs: number;
   crestImg: string;
   characters: ICharacter[];
   sound: Sound;

   state: IGameState;
   timer: number | null = null;
   gameGrid: HTMLElement;
   movesEl: HTMLElement;
   matchesEl: HTMLElement;
   timeEl: HTMLElement;
   progressBar: HTMLElement;
   restartBtn: HTMLButtonElement;
   playAgainBtn: HTMLButtonElement;
   winModal: HTMLElement;
   winText: HTMLElement;
   soundBtn: HTMLButtonElement;

  constructor(characters: ICharacter[], crestImg: string) {
    this.characters = characters;
    this.crestImg = crestImg;  //back image
    this.totalPairs = characters.length;
    this.sound = new Sound(true);

    this.state = {
      cards: [],
      selected: [],
      moves: 0,
      matches: 0,
      isLocked: false,
      seconds: 0,
      running: false,
      soundOn: true,
      isGameOver: false,
      totalPairs:6
    };

    this.gameGrid = this.getElement("gameGrid");
    this.movesEl = this.getElement("moves");
    this.matchesEl = this.getElement("matches");
    this.timeEl = this.getElement("time");
    this.progressBar = this.getElement("progressBar");
    this.restartBtn = this.getButton("restartBtn");
    this.playAgainBtn = this.getButton("playAgainBtn");
    this.winModal = this.getElement("winModal");
    this.winText = this.getElement("winText");
    this.soundBtn = this.getButton("soundBtn");


    console.log("Game constructor called");
    console.log("Characters:", this.characters);
  }

  init(): void {
    console.log("Game init called");
    this.bindEvents();
    this.reset();
  }

  reset(): void {
    this.state.cards = this.buildDeck();
    this.state.selected = [];
    this.state.moves = 0;
    this.state.matches = 0;
    this.state.isLocked = false;
    this.state.seconds = 0;
    this.state.running = false;
    this.state.isGameOver = false;

    this.winModal.classList.remove("show");
    this.update();
    this.renderCards();

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  startTimer(): void {
    if (this.timer) clearInterval(this.timer);

    this.timer = window.setInterval(() => {
      if (this.state.running && !this.state.isGameOver) {
        this.state.seconds++;
        this.update();
      }
    }, 1000);
  }

  update(): void {
    this.movesEl.textContent = String(this.state.moves);
    this.matchesEl.textContent = `${this.state.matches}/${this.totalPairs}`;
    this.timeEl.textContent = this.formatTime(this.state.seconds);
    this.progressBar.style.width = `${(this.state.matches / this.totalPairs) * 100}%`;
    this.soundBtn.textContent = this.sound.enabled ? "🔊" : "🔇";
  }

  renderCards(): void {
    console.log("Rendering cards:", this.state.cards.length);
    this.gameGrid.innerHTML = "";

    this.state.cards.forEach((card) => {
      const isFlipped = card.isFlipped || card.isMatched;

      const cardEl = document.createElement("div");
      cardEl.className = `card card-3d card-tile ${this.state.isLocked ? "card-locked" : ""} ${isFlipped ? "card-flipped" : ""} ${card.isMatched ? "matched" : ""}`;
      cardEl.dataset.uid = String(card.id);

      cardEl.innerHTML = `
        <div class="card-inner">
          <div class="card-face card-back">
            <img src="${this.crestImg}" alt="" loading="lazy">
          </div>
          <div class="card-face card-front">
            <img src="${card.image}" loading="lazy">
            
          </div>
        </div>
      `;

      cardEl.addEventListener("click", () => this.handleClick(card.id));
      this.gameGrid.appendChild(cardEl);
    });
  }

  handleClick(uid: number): void {
    if (this.state.isLocked || this.state.isGameOver) return;

    const card = this.state.cards.find((c) => c.id  === uid);
    if (!card || card.isFlipped || card.isMatched) return;

    if (!this.state.running) {
      this.state.running = true;
      this.startTimer();
    }

    this.sound.playTone(520, 0.12, "triangle");

    card.isFlipped = true;
    this.state.selected.push(uid);
    this.renderCards();

    if (this.state.selected.length === 2) {
      this.state.moves++;
      this.state.isLocked = true;
      this.update();

      const [a, b] = this.state.selected;
      const ca = this.state.cards.find((c) => c.id === a);
      const cb = this.state.cards.find((c) => c.id === b);

      if (!ca || !cb) return;

      if (ca.pairId === cb.pairId) {
        window.setTimeout(() => {
          ca.isMatched = true;
          cb.isMatched = true;
          this.state.matches++;

          this.sound.playTone(740, 0.18, "sine");

          if (this.state.matches === this.totalPairs) {
            this.state.isGameOver = true;
            this.state.running = false;

            window.setTimeout(() => this.sound.playTone(880, 0.4, "sine"), 50);
            window.setTimeout(() => this.sound.playTone(1175, 0.5, "sine"), 250);

            this.winText.textContent = `You matched all pairs in ${this.state.moves} moves and ${this.formatTime(this.state.seconds)}.`;
            this.winModal.classList.add("show");
          }

          this.state.selected = [];
          this.state.isLocked = false;
          this.update();
          this.renderCards();
        }, 500);
      } else {
        const elA = document.querySelector(`[data-uid="${a}"]`);
        const elB = document.querySelector(`[data-uid="${b}"]`);

        if (elA) elA.classList.add("shake");
        if (elB) elB.classList.add("shake");

        window.setTimeout(() => this.sound.playTone(180, 0.18, "sawtooth"), 250);

        window.setTimeout(() => {
          ca.isFlipped = false;
          cb.isFlipped = false;
          this.state.selected = [];
          this.state.isLocked = false;
          this.update();
          this.renderCards();
        }, 1000);
      }
    }
  }

  private bindEvents(): void {
    this.restartBtn.addEventListener("click", () => this.reset());
    this.playAgainBtn.addEventListener("click", () => this.reset());
    this.soundBtn.addEventListener("click", () => {
      this.sound.toggle();
      this.update();
    });
  }

  private buildDeck(): Card[] {
    const doubled = [...this.characters, ...this.characters];

    const deck = doubled.map(
      (char, index) =>
        new Card(
          index + 1 + Math.random(),
          char.id,
          char.image,

        )
    );

    return this.shuffle(deck);
  }

  private shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  private formatTime(sec: number): string {
    const mm = String(Math.floor(sec / 60)).padStart(2, "0");
    const ss = String(sec % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  private getElement(id: string): HTMLElement {
    const el = document.getElementById(id);
    if (!el) throw new Error(`Element with id '${id}' not found`);
    return el;
  }

  private getButton(id: string): HTMLButtonElement {
    const el = document.getElementById(id);
    if (!el || !(el instanceof HTMLButtonElement)) {
      throw new Error(`Button with id '${id}' not found`);
    }
    return el;
  }
}