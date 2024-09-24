import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer, OfferType, City, Goods } from '../../types/index.js';

const DEFAULT_ZOOM = 9;

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  private validateRawData(): void {
    if (! this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      id,
      title,
      description,
      createdDate,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      hostId,
      comments,
      lat,
      lon,
    ] = line.split('\t');

    return {
      id,
      title,
      description,
      createdDate: new Date(createdDate),
      city: city as City,
      previewImage,
      images: this.parseStringsSplitBySemicolon(images),
      isPremium: this.parseBoolean(isPremium),
      isFavorite: this.parseBoolean(isFavorite),
      rating: this.parseFloat(rating),
      type: type as OfferType,
      bedrooms: this.parseInt(bedrooms),
      maxAdults: this.parseInt(maxAdults),
      price: this.parseInt(price),
      goods: this.parseGoods(goods),
      hostId,
      comments: this.parseInt(comments),
      location: {
        latitude: this.parseFloat(lat),
        longitude: this.parseFloat(lon),
        zoom: DEFAULT_ZOOM
      }
    };
  }

  private parseStringsSplitBySemicolon(parseString: string): string[] {
    return parseString.split(';');
  }

  private parseGoods(goodsString: string): Goods[] {
    return goodsString.split(';') as Goods[];
  }

  private parseBoolean(booleanString: string): boolean {
    if(booleanString.toLowerCase() === 'true'){
      return true;
    } else{
      return false;
    }
  }

  private parseInt(priceString: string): number {
    return Number.parseInt(priceString, 10);
  }

  private parseFloat(priceString: string): number {
    return Number.parseFloat(priceString);
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
