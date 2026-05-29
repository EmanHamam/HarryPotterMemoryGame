import { ICard } from "./ICard.js";

export interface IGameState {
  moves: number;
  matches: number;
  totalPairs: number;
  cards: ICard[];
  selected: number[];
  seconds: number;
  running: boolean;
  soundOn: boolean;
  isLocked: boolean;
  isGameOver: boolean;

  
}