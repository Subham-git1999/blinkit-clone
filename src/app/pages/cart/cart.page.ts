import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { LucideAngularModule } from 'lucide-angular';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink,
    LucideAngularModule
  ],
  template: `
    <section class="space-y-4">
      <div class="flex items-end justify-between">
        <div>
          <div class="font-display text-xl font-extrabold tracking-tight">Your cart</div>
          <div class="mt-1 text-[13px] font-medium text-black/60">Review items before checkout.</div>
        </div>
        <a
          routerLink="/"
          class="hidden sm:inline-flex rounded-xl border border-black/10 bg-white px-3 py-2 text-[12px] font-extrabold hover:shadow-soft"
        >
          Add more
        </a>
      </div>

      @if (lines().length === 0) {
        <div class="rounded-2xl border border-black/5 bg-white p-8 text-center">
          <div class="text-[14px] font-extrabold">Cart is empty</div>
          <div class="mt-1 text-[13px] font-medium text-black/60">
            Add a few essentials and they’ll show up here.
          </div>
          <a
            routerLink="/"
            class="mt-5 inline-flex rounded-xl bg-blinkit-brand px-5 py-2.5 text-[13px] font-extrabold text-blinkit-text hover:brightness-95"
          >
            Explore products
          </a>
        </div>
      } @else {
        <div class="grid gap-4 lg:grid-cols-3">
          <div class="space-y-3 lg:col-span-2">
            @for (l of lines(); track l.product.id) {
              <div class="rounded-2xl border border-black/5 bg-white p-3 sm:p-4">
                <div class="flex gap-3">
                  <div class="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f6f7f9]">
                    <img
                      class="h-full w-full object-cover"
                      [src]="l.product.imageUrl"
                      width="640"
                      height="640"
                      [alt]="l.product.name"
                    />
                  </div>

                  <div class="min-w-0 flex-1">
                    <div class="flex items-start justify-between gap-3">
                      <div class="min-w-0">
                        <div class="truncate text-[13px] font-extrabold">{{ l.product.name }}</div>
                        <div class="mt-1 text-[12px] font-semibold text-black/55">
                          {{ l.product.quantityLabel }}
                        </div>
                      </div>

                      <button
                        type="button"
                        (click)="remove(l.product.id)"
                        class="grid h-9 w-9 place-items-center rounded-xl border border-black/10 hover:bg-black/5"
                        aria-label="Remove item"
                      >
                        <lucide-angular name="trash-2" class="h-4 w-4 text-black/70" />
                      </button>
                    </div>

                    <div class="mt-3 flex items-center justify-between gap-3">
                      <div class="text-[13px] font-extrabold text-blinkit-success">
                        {{ l.product.price | currency : 'INR' : 'symbol' }}
                        <span class="text-[12px] font-semibold text-black/40">× {{ l.qty }}</span>
                      </div>

                      <div class="inline-flex items-center rounded-xl border border-black/10 bg-white">
                        <button
                          type="button"
                          (click)="dec(l.product.id)"
                          class="grid h-9 w-9 place-items-center rounded-l-xl hover:bg-black/5"
                          aria-label="Decrease quantity"
                        >
                          <lucide-angular name="minus" class="h-4 w-4" />
                        </button>
                        <div class="min-w-8 px-1 text-center text-[12px] font-extrabold">
                          {{ l.qty }}
                        </div>
                        <button
                          type="button"
                          (click)="add(l.product)"
                          class="grid h-9 w-9 place-items-center rounded-r-xl hover:bg-black/5"
                          aria-label="Increase quantity"
                        >
                          <lucide-angular name="plus" class="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>

          <aside class="rounded-2xl border border-black/5 bg-white p-4 lg:sticky lg:top-[88px]">
            <div class="text-[14px] font-extrabold">Bill details</div>

            <div class="mt-4 space-y-2 text-[13px] font-semibold text-black/70">
              <div class="flex items-center justify-between">
                <span>Items</span>
                <span>{{ totalItems() }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span>Subtotal</span>
                <span class="font-extrabold text-blinkit-text">
                  {{ subtotal() | currency : 'INR' : 'symbol' }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span>Delivery</span>
                <span class="font-extrabold text-blinkit-success">FREE</span>
              </div>
              <div class="h-px bg-black/5"></div>
              <div class="flex items-center justify-between text-[14px]">
                <span class="font-extrabold">Total</span>
                <span class="font-extrabold">{{ subtotal() | currency : 'INR' : 'symbol' }}</span>
              </div>
            </div>

            <a
              routerLink="/checkout"
              class="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-blinkit-brand px-4 py-3 text-[13px] font-extrabold text-blinkit-text hover:brightness-95"
            >
              Proceed to checkout
            </a>

            <button
              type="button"
              (click)="clear()"
              class="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-3 text-[12px] font-extrabold hover:bg-black/5"
            >
              Clear cart
            </button>
          </aside>
        </div>
      }
    </section>
  `
})
export class CartPage {
  private readonly cart = inject(CartService);

  readonly lines = this.cart.lines;
  readonly totalItems = this.cart.totalItems;
  readonly subtotal = this.cart.subtotal;

  add(product: Product) {
    this.cart.add(product);
  }
  dec(id: string) {
    this.cart.decrement(id);
  }
  remove(id: string) {
    this.cart.remove(id);
  }
  clear() {
    this.cart.clear();
  }
}

