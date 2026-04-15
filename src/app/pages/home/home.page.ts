import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { CategorySidebarComponent } from '../../components/category-sidebar/category-sidebar.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CATEGORIES, PRODUCTS } from '../../data/catalog';
import { CategoryId, Product } from '../../models/product';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CategorySidebarComponent, ProductCardComponent],
  template: `
    <section class="space-y-4">
      <div class="rounded-2xl bg-white p-4 sm:p-5">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div class="font-display text-xl font-extrabold tracking-tight">Groceries in 10 minutes</div>
            <div class="mt-1 text-[13px] font-medium text-black/60">
              Fresh picks, daily essentials, and premium quick-search.
            </div>
          </div>

          <div class="rounded-xl bg-blinkit-brand px-3 py-2 text-[12px] font-extrabold">
            FREE delivery above ₹199
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4 md:flex-row">
        <app-category-sidebar
          [categories]="categories"
          [selectedId]="selectedCategory()"
          (select)="setCategory($event)"
        />

        <section class="min-w-0 flex-1">
          <div class="mb-3 flex items-center justify-between">
            <div class="text-[14px] font-extrabold">
              @if (selectedCategory() === 'all') {
                All products
              } @else {
                {{ categoryLabel() }}
              }
            </div>
            <div class="text-[12px] font-semibold text-black/50">{{ filtered().length }} items</div>
          </div>

          @if (filtered().length === 0) {
            <div class="rounded-2xl border border-black/5 bg-white p-6 text-center">
              <div class="text-[14px] font-extrabold">No results</div>
              <div class="mt-1 text-[13px] font-medium text-black/60">
                Try a different search term like “milk” or “chips”.
              </div>
            </div>
          } @else {
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              @for (p of filtered(); track p.id) {
                <app-product-card [product]="p" />
              }
            </div>
          }
        </section>
      </div>
    </section>
  `
})
export class HomePage {
  private readonly route = inject(ActivatedRoute);

  readonly categories = CATEGORIES;

  readonly selectedCategory = signal<CategoryId | 'all'>('all');

  private readonly queryParamMap = toSignal(this.route.queryParamMap, { initialValue: this.route.snapshot.queryParamMap });
  readonly query = computed(() => (this.queryParamMap().get('q') ?? '').trim().toLowerCase());

  readonly categoryLabel = computed(() => {
    const id = this.selectedCategory();
    if (id === 'all') return 'All products';
    return this.categories.find((c) => c.id === id)?.label ?? 'Products';
  });

  readonly filtered = computed<Product[]>(() => {
    const q = this.query();
    const category = this.selectedCategory();

    return PRODUCTS.filter((p) => {
      const okCategory = category === 'all' || p.categoryId === category;
      if (!okCategory) return false;
      if (!q) return true;
      const hay = `${p.name} ${p.brand ?? ''} ${p.quantityLabel}`.toLowerCase();
      return hay.includes(q);
    });
  });

  setCategory(id: CategoryId | 'all') {
    this.selectedCategory.set(id);
  }
}

