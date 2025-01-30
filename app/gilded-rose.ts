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

      if (name != 'Aged Brie' && name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (quality > 0) {         
            quality = quality - 1
          
        }
      } else {
        if (quality < 50) {
          quality = quality + 1
          if (name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (sellIn < 6) {
              if (quality < 50) {
                quality = quality + 3;
              }
            } else if (sellIn < 11) {
              if (quality < 50) {
                quality = quality + 2
              }
            }
            
          }
        }
      }
     
      sellIn = sellIn - 1;
      
      if (sellIn < 0) {
        if (name != 'Aged Brie') {
          if (name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (quality > 0) {
                quality = quality - 1              
            }
          } else {
            quality = 0;
          }
        } else {
          if (quality < 50) {
            quality= quality + 1
          }
        }
      }

      this.items[i].sellIn = sellIn;
      this.items[i].quality = quality;
    }

    

    return this.items;
  }

  addQuality(quality : number, numberToAdd : number) {
    if(quality < 50) {
        quality = quality + numberToAdd;
    } 
    return quality
  }

  subtractQuality(quality : number, numberToSubtract : number) {
    if(quality > 0) {
        quality = quality - numberToSubtract;
    } 
    return quality;
  }
}
