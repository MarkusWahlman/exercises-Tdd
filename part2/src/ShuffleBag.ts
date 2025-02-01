export class ShuffleBag<T> {
  private items: T[];
  private currentBag: T[];
  private index: number;

  constructor(items: T[]) {
    this.items = [...items];
    this.currentBag = [];
    this.index = 0;
  }

  private shuffle() {
    this.currentBag = [...this.items];
    for (let i = this.currentBag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.currentBag[i], this.currentBag[j]] = [this.currentBag[j], this.currentBag[i]];
    }
    this.index = 0;
  }

  next(): T {
    if (this.index >= this.currentBag.length) {
      this.shuffle();
    }

    return this.currentBag[this.index++];
  }
}
