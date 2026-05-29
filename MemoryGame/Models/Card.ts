import { ICard } from "../Interfaces/ICard.js";

export class Card implements ICard {
     id: number
     pairId: number
     image: string
     isFlipped: boolean = false
     isMatched: boolean = false
  constructor(id: number,pairId: number,image: string,) {
    this.id=id
    this.pairId=pairId
    this.image=image
  }

  flip(): void {
    if (!this.isMatched) {
      this.isFlipped = !this.isFlipped;
    }
  }

  show(): void {
    if (!this.isMatched) {
      this.isFlipped = true;
    }
  }

  hide(): void {
    if (!this.isMatched) {
      this.isFlipped = false;
    }
  }

  match(): void {
    this.isMatched = true;
    this.isFlipped = true;
  }
}