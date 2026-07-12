export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  link: string;
  source: 'Rozetka' | 'OLX' | 'Prom';
  isUsed: boolean;
  conditionDetails?: string;
}
