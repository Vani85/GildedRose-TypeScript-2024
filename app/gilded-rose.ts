export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const name = this.items[i].name;
      let quality = this.items[i].quality;
      let sellIn = this.items[i].sellIn;

      if (name != 'Aged Brie' && name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (quality > 0) {
          if (name!= 'Sulfuras, Hand of Ragnaros') {
            quality = quality - 1
          }
        }
      } else {
        if (quality < 50) {
          quality = quality + 1
          if (name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (sellIn < 11) {
              if (quality < 50) {
                quality = quality + 1
              }
            }
            if (sellIn < 6) {
              if (quality < 50) {
                quality = quality + 1
              }
            }
          }
        }
      }
      if (name != 'Sulfuras, Hand of Ragnaros') {
        sellIn = sellIn - 1;
      }
      if (sellIn < 0) {
        if (name != 'Aged Brie') {
          if (name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (quality > 0) {
              if (name != 'Sulfuras, Hand of Ragnaros') {
                quality = quality - 1
              }
            }
          } else {
            quality = quality- quality
          }
        } else {
          if (quality < 50) {
            quality= quality + 1
          }
        }
      }
    }

    return this.items;
  }
}
