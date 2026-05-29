export interface ICard {
  id: number;
  pairId: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;

  flip(): void;
  hide(): void;
  show(): void;
  match(): void;
}
