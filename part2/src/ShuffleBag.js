export class ShuffleBag {
    items;
    currentBag;
    index;
    constructor(items) {
        this.items = [...items];
        this.currentBag = [];
        this.index = 0;
    }
    shuffle() {
        this.currentBag = [...this.items];
        for (let i = this.currentBag.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.currentBag[i], this.currentBag[j]] = [this.currentBag[j], this.currentBag[i]];
        }
        this.index = 0;
    }
    next() {
        if (this.index >= this.currentBag.length) {
            this.shuffle();
        }
        return this.currentBag[this.index++];
    }
}
