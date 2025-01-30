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

      switch(name) {
          case 'Sulfuras, Hand of Ragnaros' :
              return this.items;
          case 'Aged Brie':
              quality = GildedRose.addQuality(quality, 1);
              break;
          case 'Backstage passes':
              quality = GildedRose.updateBackstageQuality(sellIn,quality);
              break;
          case 'Conjured Mana Cake':
              quality = GildedRose.subtractQuality(quality, 2);
              break;
          default :
              quality = GildedRose.subtractQuality(quality, 1);
      }
           
      sellIn = sellIn - 1;
      if (sellIn < 0) {
          switch(name) {
              case 'Aged Brie':
                  quality = GildedRose.addQuality(quality, 1);
                  break;
              case 'Backstage passes' :
                  quality = 0;
                  break;
              default :
                  quality = GildedRose.subtractQuality(quality, 1);
          }
      }

      this.items[i].sellIn = sellIn;
      this.items[i].quality = quality;
    }
    return this.items;
  }

  static addQuality(quality : number, numberToAdd : number) {
      return quality < 50 ? quality + numberToAdd : quality;
  }

  static subtractQuality(quality : number, numberToSubtract : number) {
      return quality > 0 ?  quality - numberToSubtract : quality;
  }

  static updateBackstageQuality(sellIn : number,  quality : number) {
      if (sellIn < 6) {
          quality = GildedRose.addQuality(quality, 3);
      } else if (sellIn < 11) {
          quality =  GildedRose.addQuality(quality, 2);
      } else {
        quality =  GildedRose.addQuality(quality, 1);
      }
      return quality;
  }
}
