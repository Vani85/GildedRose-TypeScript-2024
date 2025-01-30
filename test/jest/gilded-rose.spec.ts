import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {

  it('Once the sell by date has passed, Quality degrades twice as fast', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 10), new Item('Bread', 5, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Sulfuras, Hand of Ragnaros');
    expect(items[0].quality).toBe(10);
    expect(items[1].name).toBe('Bread');
    expect(items[1].quality).toBe(4);
  });

  it('Once the sell by date has passed, Quality degrades twice as fast', () => {
    const gildedRose = new GildedRose([new Item('Bread', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Bread');
    expect(items[0].quality).toBe(8);
  });

  it('The Quality of an item is never negative', () => {
    const gildedRose = new GildedRose([new Item('Bread', 4, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Bread');
    expect(items[0].quality).toBe(0);
  });

  it('Aged Brie increases in Quality the older it gets', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Aged Brie');
    expect(items[0].quality).toBe(11);
  });

  it('Sulfuras never has to be sold or decreases in Quality', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Sulfuras, Hand of Ragnaros');
    expect(items[0].quality).toBe(10);
    expect(items[0].sellIn).toBe(5);
  });

  it('The Quality of an item can never increase to be more than 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Aged Brie');
    expect(items[0].quality).toBe(50);
  });

  it('"Backstage passes" increases in Quality as its SellIn value approaches; Quality increases by 2 when there are 10 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes', 9, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Backstage passes');
    expect(items[0].quality).toBe(12);
  });

  it('"Backstage passes" increases in Quality as its SellIn value approaches; Quality increases by 3 when there are 5 days o less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes', 4, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Backstage passes');
    expect(items[0].quality).toBe(13);
  });

  it('"Backstage passes" increases in Quality as its SellIn value approaches; Quality drops to 0 after the concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Backstage passes');
    expect(items[0].quality).toBe(0);
  });

  it('"Conjured" items degrade in Quality twice as fast as normal items', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Conjured Mana Cake');
    expect(items[0].quality).toBe(8);
  });
});
