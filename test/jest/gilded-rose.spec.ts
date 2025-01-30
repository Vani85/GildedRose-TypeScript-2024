import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  // it('should foo', () => {
  //   const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
  //   const items = gildedRose.updateQuality();
  //   expect(items[0].name).toBe('fixme');
  // });

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
  
/*

The Quality of an item can never increase to be more than 50

"Backstage passes", like aged brie, increases in Quality as its SellIn value approaches; Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days o less but Quality drops to 0 after the concert

"Conjured" items degrade in Quality twice as fast as normal items
*/


});
