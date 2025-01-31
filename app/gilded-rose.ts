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
              quality = 80;
              break;
          case 'Aged Brie':
              quality = GildedRose.addQuality(quality, 1);
              break;
          case (name.match(/^Backstage passes/) || {}).input: 
              quality = GildedRose.updateBackstageQuality(sellIn,quality);
              break;
          case 'Conjured Mana Cake':
              quality = GildedRose.subtractQuality(quality, 2);
              quality = sellIn == 0 ? GildedRose.subtractQuality(quality, 1) : quality;
              break;
          default :
              quality = GildedRose.subtractQuality(quality, 1);
              quality = sellIn == 0 ? GildedRose.subtractQuality(quality, 1) : quality;
      }
      
      sellIn = GildedRose.updateSellIn(sellIn,name);
      
      this.items[i].sellIn = sellIn;
      this.items[i].quality = quality;
    }
    return this.items;
  }

  static updateSellIn(sellIn : number, name : string) {
      if(name !== 'Sulfuras, Hand of Ragnaros')   
          sellIn = sellIn - 1;

      return sellIn;
  }
  static addQuality(quality : number, numberToAdd : number) {
      return (quality + numberToAdd) <= 50 ? quality + numberToAdd : 50;
  }

  static subtractQuality(quality : number, numberToSubtract : number) {
      return (quality - numberToSubtract) >= 0 ?  quality - numberToSubtract : 0;
  }

  static updateBackstageQuality(sellIn : number,  quality : number) {
      if(sellIn <= 0) {
          quality = 0;
      } else if (sellIn < 6) {
          quality = GildedRose.addQuality(quality, 3);
      } else if (sellIn < 11) {
          quality =  GildedRose.addQuality(quality, 2);
      } else {
        quality =  GildedRose.addQuality(quality, 1);
      }
      return quality;
  }

}
