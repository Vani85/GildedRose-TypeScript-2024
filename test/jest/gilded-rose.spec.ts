import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {

  it('Sulfuras never has to be sold or decreases in Quality', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 10), new Item('Bread', 5, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Sulfuras, Hand of Ragnaros');
    expect(items[0].quality).toBe(80);
    expect(items[1].name).toBe('Bread');
    expect(items[1].quality).toBe(4);
  });

  it('Sell in date should not decrease for Sulfuras', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 10), new Item('Sulfuras, Hand of Ragnaros', 0, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Sulfuras, Hand of Ragnaros');
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(5);
    expect(items[1].name).toBe('Sulfuras, Hand of Ragnaros');
    expect(items[1].quality).toBe(80);
    expect(items[1].sellIn).toBe(0);
  });

  it('Once the sell by date has passed, Quality degrades twice as fast', () => {
    const gildedRose = new GildedRose([new Item('Bread', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Bread');
    expect(items[0].quality).toBe(8);
  });

  it('Quality decreases by 2 only if sellby date is 0', () => {
    const gildedRose = new GildedRose([new Item('Bread', 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Bread');
    expect(items[0].quality).toBe(9);
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

  it('Aged Brie increases in Quality the older it gets even if sellin is 0', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Aged Brie');
    expect(items[0].quality).toBe(11);
  });

  it('Sulfuras never has to be sold or decreases in Quality', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Sulfuras, Hand of Ragnaros');
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(5);
  });

  it('The Quality of an item can never increase to be more than 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Aged Brie');
    expect(items[0].quality).toBe(50);
  });

  it('The Quality of an item can never increase to be more than 50', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes', 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Backstage passes');
    expect(items[0].quality).toBe(50);
  });

  it('"Backstage passes" Quality increases by 2 when there are 10 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes', 9, 10),new Item('Backstage passes', 10, 11), 
                      new Item('Backstage passes', 11, 9)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Backstage passes');
    expect(items[0].quality).toBe(12);
    expect(items[1].name).toBe('Backstage passes');
    expect(items[1].quality).toBe(13);
    expect(items[2].name).toBe('Backstage passes');
    expect(items[2].quality).toBe(10);
  });

  it('Quality should not go beyond 50', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes', 9, 49),new Item('Backstage passes', 3, 48)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Backstage passes');
    expect(items[0].quality).toBe(50);
    expect(items[1].name).toBe('Backstage passes');
    expect(items[1].quality).toBe(50);
  });

  it('Quality should not go below 0', () => {
    const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', 9, 1),new Item('Bread', 3, 0),
                                      new Item('Conjured Mana Cake', 3, 1),new Item('Conjured Mana Cake', 3, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Elixir of the Mongoose');
    expect(items[0].quality).toBe(0);
    expect(items[1].name).toBe('Bread');
    expect(items[1].quality).toBe(0);
    expect(items[2].name).toBe('Conjured Mana Cake');
    expect(items[2].quality).toBe(0);
    expect(items[3].name).toBe('Conjured Mana Cake');
    expect(items[3].quality).toBe(0);
  });

  it('"Backstage passes" Quality increases by 3 when there are 5 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes', 4, 10),new Item('Backstage passes', 5, 10),new Item('Backstage passes', 6, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Backstage passes');
    expect(items[0].quality).toBe(13);
    expect(items[1].name).toBe('Backstage passes');
    expect(items[1].quality).toBe(13);
    expect(items[2].name).toBe('Backstage passes');
    expect(items[2].quality).toBe(12);
  });

  it('"Backstage passes" Quality drops to 0 after the concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes', 0, 10),new Item('Backstage passes', 1, 10),
                                      new Item('Backstage passes', -3, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Backstage passes');
    expect(items[0].quality).toBe(0);
    expect(items[1].name).toBe('Backstage passes');
    expect(items[1].quality).toBe(13);
    expect(items[2].name).toBe('Backstage passes');
    expect(items[2].quality).toBe(0);
  });

  it('"Conjured" items degrade in Quality twice as fast as normal items', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Conjured Mana Cake');
    expect(items[0].quality).toBe(8);
  });

  it('"Multiple scenarios', () => {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 10, 20), 
                                      new Item("Aged Brie", 2, 0), 
                                      new Item("Elixir of the Mongoose", 5, 7), 
                                      new Item("Sulfuras, Hand of Ragnaros", 0, 80), 
                                      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
                                      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
                                      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
                                      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
                                      new Item("Conjured Mana Cake", 3, 6)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('+5 Dexterity Vest');
    expect(items[0].quality).toBe(19);
    expect(items[0].sellIn).toBe(9);

    expect(items[1].name).toBe('Aged Brie');
    expect(items[1].quality).toBe(1);
    expect(items[1].sellIn).toBe(1);

    expect(items[2].name).toBe('Elixir of the Mongoose');
    expect(items[2].quality).toBe(6);
    expect(items[2].sellIn).toBe(4);

    expect(items[3].name).toBe('Sulfuras, Hand of Ragnaros');
    expect(items[3].quality).toBe(80);
    expect(items[3].sellIn).toBe(0);

    expect(items[4].name).toBe('Sulfuras, Hand of Ragnaros');
    expect(items[4].quality).toBe(80);
    expect(items[4].sellIn).toBe(-1);

    expect(items[5].name).toBe('Backstage passes to a TAFKAL80ETC concert');
    expect(items[5].quality).toBe(21);
    expect(items[5].sellIn).toBe(14);

    expect(items[6].name).toBe('Backstage passes to a TAFKAL80ETC concert');
    expect(items[6].quality).toBe(50);
    expect(items[6].sellIn).toBe(9);

    expect(items[7].name).toBe('Backstage passes to a TAFKAL80ETC concert');
    expect(items[7].quality).toBe(50);
    expect(items[7].sellIn).toBe(4);

    expect(items[8].name).toBe('Conjured Mana Cake');
    expect(items[8].quality).toBe(4);
    expect(items[8].sellIn).toBe(2);

  });
});
