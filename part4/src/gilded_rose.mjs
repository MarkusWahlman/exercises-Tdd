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

  _increaseItemQuality(index, increaseBy = 1) {
    if (this.items[index].quality < 50) {
      this.items[index].quality = this.items[index].quality + increaseBy;
    }
  }

  _decreaseItemQuality(index, decreaseBy = 1) {
    if (this.items[index].quality > 0) {
      this.items[index].quality = this.items[index].quality - decreaseBy;
    }
  }

  _adjustItemQuality(index, adjustBy) {
    if (adjustBy > 0) {
      this._increaseItemQuality(index, adjustBy);
    } else {
      this._decreaseItemQuality(index, Math.abs(adjustBy));
    }
  }

  updateItemQuality(index) {
    let expiredItemQualityAdjust = -1;

    if (this.items[index].name === "Sulfuras, Hand of Ragnaros") {
      return;
    } else if (this.items[index].name === "Aged Brie") {
      this._increaseItemQuality(index);

      if (this.items[index].sellIn < 1) {
        this._increaseItemQuality(index);
      }

      expiredItemQualityAdjust = 0;
    } else if (this.items[index].name === "Backstage passes to a TAFKAL80ETC concert") {
      this._increaseItemQuality(index);
      if (this.items[index].sellIn < 11) {
        this._increaseItemQuality(index);
      }
      if (this.items[index].sellIn < 6) {
        this._increaseItemQuality(index);
      }

      expiredItemQualityAdjust = -this.items[index].quality;
    } else {
      this._decreaseItemQuality(index);
    }

    this.updateItemSellIn(index);

    if (this.items[index].sellIn < 0) {
      this._adjustItemQuality(index, expiredItemQualityAdjust);
    }
  }

  updateItemSellIn(index) {
    this.items[index].sellIn = this.items[index].sellIn - 1;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      this.updateItemQuality(i);
    }

    return this.items;
  }
}
