import { Component, computed, inject, input } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe, LucideAngularModule],
  template: `
    <div
      class="group relative flex h-full flex-col rounded-[12px] border border-black/10 bg-white p-3 transition hover:shadow-soft"
    >
      <div class="relative overflow-hidden rounded-xl bg-[#f6f7f9]">
        <div class="absolute left-2 top-2 z-10 rounded-md bg-black/80 px-2 py-1 text-[10px] font-extrabold text-white">
          10 MINS
        </div>

        <img
          class="h-36 w-full object-cover sm:h-40"
          [src]="product().imageUrl"
          width="640"
          height="640"
          [alt]="product().name"
          priority="false"
        />
      </div>

      <div class="mt-3 flex-1">
        <div class="line-clamp-2 text-[13px] font-semibold text-blinkit-text">
          {{ product().name }}
        </div>
        <div class="mt-1 text-[12px] font-medium text-black/55">
          {{ product().quantityLabel }}
          @if (product().brand) {
            <span class="mx-1 text-black/30">•</span>
            {{ product().brand }}
          }
        </div>
      </div>

      <div class="mt-3 flex items-end justify-between gap-2">
        <div class="leading-tight">
          <div class="flex items-baseline gap-2">
            <div class="text-[14px] font-extrabold text-blinkit-success">
              {{ product().price | currency : 'INR' : 'symbol' }}
            </div>
            @if (product().mrp) {
              <div class="text-[12px] font-semibold text-black/40 line-through">
                {{ product().mrp | currency : 'INR' : 'symbol' }}
              </div>
            }
          </div>
        </div>

        @if (qty() === 0) {
          <button
            type="button"
            (click)="add()"
            class="inline-flex items-center justify-center rounded-xl border border-blinkit-success bg-white px-4 py-2 text-[12px] font-extrabold text-blinkit-success hover:bg-[#f3fff6]"
          >
            ADD
          </button>
        } @else {
          <div class="inline-flex items-center rounded-xl border border-black/10 bg-white">
            <button
              type="button"
              (click)="dec()"
              class="grid h-9 w-9 place-items-center rounded-l-xl hover:bg-black/5"
              aria-label="Decrease quantity"
            >
              <lucide-angular name="minus" class="h-4 w-4" />
            </button>
            <div class="min-w-8 px-1 text-center text-[12px] font-extrabold text-blinkit-text">
              {{ qty() }}
            </div>
            <button
              type="button"
              (click)="add()"
              class="grid h-9 w-9 place-items-center rounded-r-xl hover:bg-black/5"
              aria-label="Increase quantity"
            >
              <lucide-angular name="plus" class="h-4 w-4" />
            </button>
          </div>
        }
      </div>
    </div>
  `
})
export class ProductCardComponent {
  private readonly cart = inject(CartService);

  readonly product = input.required<Product>();
  readonly qty = computed(() => this.cart.quantity(this.product().id));

  add() {
    this.cart.add(this.product());
  }

  dec() {
    this.cart.decrement(this.product().id);
  }
}

