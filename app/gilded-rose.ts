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
      const name : string = this.items[i].name;
      let quality : number = this.items[i].quality;
      let sellIn : number = this.items[i].sellIn;

      if(name === 'Sulfuras, Hand of Ragnaros')
        return this.items;

      if (name != 'Aged Brie' && name != 'Backstage passes') {
        quality = GildedRose.subtractQuality(quality, 1);
      } else {
          quality = GildedRose.addQuality(quality, 1);
          if (name == 'Backstage passes') {
            if (sellIn < 6) {
              quality = GildedRose.addQuality(quality, 2);
            } else if (sellIn < 11) {
              quality =  GildedRose.addQuality(quality, 1);
            }
            
          }
      }
      
     
      sellIn = sellIn - 1;
      
      if (sellIn < 0) {
        if (name != 'Aged Brie') {
          if (name != 'Backstage passes') {
            quality = GildedRose.subtractQuality(quality, 1);
          } else {
            quality = 0;
          }
        } else {
          quality = GildedRose.addQuality(quality, 1);
        }
      }

      this.items[i].sellIn = sellIn;
      this.items[i].quality = quality;
    }
    return this.items;
  }

  static addQuality(quality : number, numberToAdd : number) {
    if(quality < 50) {
        quality = quality + numberToAdd;
    }
    return quality;
  }

  static subtractQuality(quality : number, numberToSubtract : number) {
    if(quality > 0) {
        quality = quality - numberToSubtract;
    } 
    return quality;
  }
}
