export class Card {
    constructor(id, pairId, image) {
        this.isFlipped = false;
        this.isMatched = false;
        this.id = id;
        this.pairId = pairId;
        this.image = image;
    }
    flip() {
        if (!this.isMatched) {
            this.isFlipped = !this.isFlipped;
        }
    }
    show() {
        if (!this.isMatched) {
            this.isFlipped = true;
        }
    }
    hide() {
        if (!this.isMatched) {
            this.isFlipped = false;
        }
    }
    match() {
        this.isMatched = true;
        this.isFlipped = true;
    }
}
