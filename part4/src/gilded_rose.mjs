export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  increaseItemQuality(index) {
    if (this.items[index].quality < 50) {
      this.items[index].quality = this.items[index].quality + 1;
    }
  }

  decreaseItemQuality(index) {
    if (this.items[index].name != "Sulfuras, Hand of Ragnaros" && this.items[index].quality > 0) {
      this.items[index].quality = this.items[index].quality - 1;
    }
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name != "Aged Brie" && this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
        this.decreaseItemQuality(i);
      } else {
        this.increaseItemQuality(i);
        if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
          if (this.items[i].sellIn < 11) {
            this.increaseItemQuality(i);
          }
          if (this.items[i].sellIn < 6) {
            this.increaseItemQuality(i);
          }
        }
      }
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
            this.decreaseItemQuality(i);
          } else {
            this.items[i].quality = 0;
          }
        } else {
          this.increaseItemQuality(i);
        }
      }
    }

    return this.items;
  }
}
