import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/product';

export type CartLine = {
  product: Product;
  qty: number;
};

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly linesById = signal<Record<string, CartLine>>({});

  readonly lines = computed(() => Object.values(this.linesById()));

  readonly totalItems = computed(() => this.lines().reduce((sum, l) => sum + l.qty, 0));

  readonly subtotal = computed(() => this.lines().reduce((sum, l) => sum + l.qty * l.product.price, 0));

  quantity(productId: string) {
    return this.linesById()[productId]?.qty ?? 0;
  }

  add(product: Product) {
    this.linesById.update((curr) => {
      const existing = curr[product.id];
      const qty = (existing?.qty ?? 0) + 1;
      return { ...curr, [product.id]: { product, qty } };
    });
  }

  decrement(productId: string) {
    this.linesById.update((curr) => {
      const existing = curr[productId];
      if (!existing) return curr;
      const nextQty = existing.qty - 1;
      if (nextQty <= 0) {
        const { [productId]: _, ...rest } = curr;
        return rest;
      }
      return { ...curr, [productId]: { ...existing, qty: nextQty } };
    });
  }

  remove(productId: string) {
    this.linesById.update((curr) => {
      if (!curr[productId]) return curr;
      const { [productId]: _, ...rest } = curr;
      return rest;
    });
  }

  clear() {
    this.linesById.set({});
  }
}

