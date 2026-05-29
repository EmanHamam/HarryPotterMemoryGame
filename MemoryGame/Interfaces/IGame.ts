import { ISound } from "../Interfaces/ISound.js";
import { ICard } from "./ICard.js";
export interface IGame{
  init(): void;
  reset(): void;
  renderCards(): void;
  handleClick(uid: number): void;
  update(): void;
  startTimer(): void;
}