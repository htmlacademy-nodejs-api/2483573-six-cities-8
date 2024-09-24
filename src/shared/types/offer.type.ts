import { Location } from './location.type.js';

export type City = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';
export type OfferType = 'apartment' | 'house' | 'room' | 'hotel';
export type Goods = 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';

export type Offer = {
  id: string,
  title: string;
  description: string;
  createdDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Goods[];
  hostId: string;
  comments: number;
  location: Location;
}
