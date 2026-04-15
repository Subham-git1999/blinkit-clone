import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-floating-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, LucideAngularModule],
  template: `
    @if (totalItems() > 0) {
      <div class="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-4 lg:px-6">
        <div
          class="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-2xl bg-blinkit-success px-4 py-3 text-white shadow-soft"
        >
          <div class="flex items-center gap-3">
            <div class="grid h-10 w-10 place-items-center rounded-xl bg-white/15">
              <lucide-angular name="shopping-cart" class="h-5 w-5" />
            </div>
            <div class="leading-tight">
              <div class="text-[12px] font-semibold text-white/90">{{ totalItems() }} items</div>
              <div class="text-[14px] font-extrabold">{{ subtotal() | currency : 'INR' : 'symbol' }}</div>
            </div>
          </div>

          <a
            routerLink="/cart"
            class="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-[13px] font-extrabold text-blinkit-text hover:bg-white/95"
          >
            View cart
          </a>
        </div>
      </div>
    }
  `
})
export class FloatingCartComponent {
  private readonly cart = inject(CartService);
  readonly totalItems = this.cart.totalItems;
  readonly subtotal = this.cart.subtotal;
}

