import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  test("can add any item", () => {
    const gildedRose = new Shop([new Item("foo", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });

  test("sellIn goes down by 1", () => {
    const gildedRose = new Shop([new Item("foo", 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
  });

  test("sellIn goes down by 1 for Aged Brie", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(4);
  });

  test("sellIn goes down by 1 for Backstage passes to a TAFKAL80ETC concert", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(4);
  });

  test("empty shop has no items", () => {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(items[0]).to.equal(undefined);
  });

  test("reduces quality by 2 when sellIn is 0 or below", () => {
    const gildedRose = new Shop([new Item("foo", -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);

    const gildedRose2 = new Shop([new Item("foo", 0, 10)]);
    const items2 = gildedRose2.updateQuality();
    expect(items2[0].quality).toBe(8);
  });

  test("reduces quality by 1 when sellIn is 1", () => {
    const gildedRose = new Shop([new Item("foo", 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(9);
  });

  test("quality never goes below 0", () => {
    const gildedRose = new Shop([new Item("foo", -1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  test("can add Aged Brie", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Aged Brie");
  });

  test("Aged Brie increases in quality", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
  });

  test("Aged Brie increases quality by 2 when sellIn is 0 and quality under 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
  });

  test("Aged Brie does not increase in quality if quality is 50 and sellIn is 0 or below", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  test("Aged Brie quality doesn't exceed 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 49)]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  test("quality goes down when sellIn is 0", () => {
    const gildedRose = new Shop([new Item("foo", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  test("Sulfuras, Hand of Ragnaros doesn't change sellIn or quality", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(5);
    expect(items[0].quality).to.equal(80);

    const gildedRoseNegative = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 40)]);
    const itemsNegative = gildedRoseNegative.updateQuality();
    expect(itemsNegative[0].sellIn).to.equal(-1);
    expect(itemsNegative[0].quality).to.equal(40);
  });

  test("can add Backstage passes to a TAFKAL80ETC concert", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
  });

  test("Backstage passes to a TAFKAL80ETC concert increase quality by 2 if sellIN is 10", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(22);
  });

  test("Backstage passes to a TAFKAL80ETC concert increase quality by 1 if sellIn is over 10", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 20, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(21);
  });

  test("Backstage passes to a TAFKAL80ETC concert increase quality by 1 if sellIn is 11", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(21);
  });

  test("Backstage passes to a TAFKAL80ETC concert increase quality by 3 if sellIn is 5", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(23);
  });

  test("Backstage passes to a TAFKAL80ETC concert increase quality by 2 if sellIn is 6", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(22);
  });

  test("Backstage passes to a TAFKAL80ETC concert quality drops to 0 if sellIn is 0", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  test("Backstage passes increase in quality to 50", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });
});
