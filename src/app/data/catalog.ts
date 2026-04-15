import { Category, Product } from '../models/product';

function svgPlaceholder(label: string, accent = '#F7EC09') {
  const safe = label.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset="1" stop-color="#f3f4f6"/>
      </linearGradient>
    </defs>
    <rect width="640" height="640" rx="32" fill="url(#g)"/>
    <circle cx="520" cy="120" r="64" fill="${accent}" opacity="0.85"/>
    <circle cx="120" cy="520" r="84" fill="#0C831F" opacity="0.10"/>
    <text x="50%" y="46%" text-anchor="middle" font-family="Inter, system-ui" font-size="44" font-weight="800" fill="#1C1C1C">${safe}</text>
    <text x="50%" y="56%" text-anchor="middle" font-family="Inter, system-ui" font-size="20" font-weight="600" fill="#6B7280">AI placeholder</text>
  </svg>
  `.trim();
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const CATEGORIES: Category[] = [
  { id: 'fruits', label: 'Fruits & Veggies' },
  { id: 'dairy', label: 'Dairy & Eggs' },
  { id: 'bakery', label: 'Bread & Bakery' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'beverages', label: 'Beverages' },
  { id: 'household', label: 'Household' },
  { id: 'personal-care', label: 'Personal Care' }
];

export const PRODUCTS: Product[] = [
  {
    id: 'milk-1',
    name: 'Amul Taaza Milk',
    quantityLabel: '500 ml',
    brand: 'Amul',
    categoryId: 'dairy',
    price: 30,
    mrp: 34,
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/eddef03b-1305-47c3-bf69-d8f42624e029.png'
  },
  {
    id: 'bread-1',
    name: 'Whole Wheat Bread',
    quantityLabel: '400 g',
    brand: 'Britannia',
    categoryId: 'bakery',
    price: 45,
    mrp: 55,
    imageUrl: svgPlaceholder('Bread', '#F7EC09')
  },
  {
    id: 'banana-1',
    name: 'Banana (Robusta)',
    quantityLabel: '6 pcs',
    categoryId: 'fruits',
    price: 36,
    mrp: 45,
    imageUrl: svgPlaceholder('Banana', '#F7EC09')
  },
  {
    id: 'apple-1',
    name: 'Apple (Royal Gala)',
    quantityLabel: '4 pcs',
    categoryId: 'fruits',
    price: 159,
    mrp: 189,
    imageUrl: svgPlaceholder('Apple', '#F7EC09')
  },
  {
    id: 'chips-1',
    name: 'Classic Salted Chips',
    quantityLabel: '52 g',
    brand: 'Lay’s',
    categoryId: 'snacks',
    price: 20,
    mrp: 25,
    imageUrl: svgPlaceholder('Chips', '#F7EC09')
  },
  {
    id: 'nuts-1',
    name: 'Roasted Almonds',
    quantityLabel: '100 g',
    categoryId: 'snacks',
    price: 220,
    mrp: 260,
    imageUrl: svgPlaceholder('Almonds', '#F7EC09')
  },
  {
    id: 'cola-1',
    name: 'Cola Soft Drink',
    quantityLabel: '750 ml',
    categoryId: 'beverages',
    price: 45,
    mrp: 55,
    imageUrl: svgPlaceholder('Cola', '#F7EC09')
  },
  {
    id: 'water-1',
    name: 'Mineral Water',
    quantityLabel: '1 L',
    categoryId: 'beverages',
    price: 20,
    mrp: 25,
    imageUrl: svgPlaceholder('Water', '#F7EC09')
  },
  {
    id: 'detergent-1',
    name: 'Laundry Detergent',
    quantityLabel: '1 kg',
    categoryId: 'household',
    price: 169,
    mrp: 199,
    imageUrl: svgPlaceholder('Detergent', '#F7EC09')
  },
  {
    id: 'cleaner-1',
    name: 'Floor Cleaner',
    quantityLabel: '500 ml',
    categoryId: 'household',
    price: 99,
    mrp: 129,
    imageUrl: svgPlaceholder('Cleaner', '#F7EC09')
  },
  {
    id: 'shampoo-1',
    name: 'Shampoo (Smooth)',
    quantityLabel: '180 ml',
    categoryId: 'personal-care',
    price: 149,
    mrp: 179,
    imageUrl: svgPlaceholder('Shampoo', '#F7EC09')
  },
  {
    id: 'soap-1',
    name: 'Bathing Soap',
    quantityLabel: '4 x 100 g',
    categoryId: 'personal-care',
    price: 120,
    mrp: 140,
    imageUrl: svgPlaceholder('Soap', '#F7EC09')
  }
];

