export type CategoryId =
  | 'dairy'
  | 'bakery'
  | 'fruits'
  | 'snacks'
  | 'beverages'
  | 'household'
  | 'personal-care';

export type Category = {
  id: CategoryId;
  label: string;
};

export type Product = {
  id: string;
  name: string;
  quantityLabel: string; // e.g. "500 ml"
  brand?: string;
  categoryId: CategoryId;
  price: number;
  mrp?: number;
  imageUrl: string;
};

