export class Item {
  constructor(name, sellIn, quality, isConjured = false) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.isConjured = isConjured;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  _increaseItemQuality(index, increaseBy = 1) {
    if (this.items[index].quality + increaseBy <= 50) {
      this.items[index].quality = this.items[index].quality + increaseBy;
    } else {
      this.items[index].quality = 50;
    }
  }

  _decreaseItemQuality(index, decreaseBy = 1) {
    if (this.items[index].quality - decreaseBy >= 0) {
      this.items[index].quality = this.items[index].quality - decreaseBy;
    } else {
      this.items[index].quality = 0;
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
    const qualityDecrease = this.items[index].isConjured ? 2 : 1;
    let expiredItemQualityAdjust = qualityDecrease * -1;

    if (this.items[index].name === "Sulfuras, Hand of Ragnaros") {
      return;
    } else if (this.items[index].name === "Aged Brie") {
      this._increaseItemQuality(index);

      expiredItemQualityAdjust = 1;
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
      this._decreaseItemQuality(index, qualityDecrease);
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
