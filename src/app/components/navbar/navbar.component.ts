import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  template: `
    <header class="sticky top-0 z-40 w-full border-b border-black/5 bg-white/90 backdrop-blur">
      <div class="mx-auto flex w-full max-w-7xl items-center gap-3 px-3 py-3 sm:px-4 lg:px-6">
        <a
          routerLink="/"
          class="flex shrink-0 items-center gap-2 rounded-xl px-2 py-1 font-display text-lg font-extrabold tracking-tight text-blinkit-text"
        >
          <span class="grid h-9 w-9 place-items-center rounded-xl bg-blinkit-brand text-[15px] font-black">B</span>
          <span class="hidden sm:block">blinkit</span>
        </a>

        <div class="hidden md:flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2">
          <lucide-angular name="map-pin" class="h-4 w-4 text-black/70"></lucide-angular>
          <div class="leading-tight">
            <div class="text-[11px] font-semibold text-black/60">Delivery in</div>
            <div class="text-[13px] font-bold">10 mins</div>
          </div>
        </div>

        <div class="flex min-w-0 flex-1 items-center">
          <div class="relative w-full">
            <lucide-angular
              name="search"
              class="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-black/50"
            />
            <input
              class="w-full rounded-xl border border-black/10 bg-[#f6f7f9] py-2.5 pl-10 pr-3 text-[13px] font-medium text-blinkit-text placeholder:text-black/40 focus:border-black/20 focus:outline-none focus:ring-2 focus:ring-blinkit-brand/40"
              type="search"
              [value]="query()"
              (input)="onInput($any($event.target).value)"
              placeholder="Search for ‘milk’, ‘bread’, ‘chips’..."
              aria-label="Quick search"
            />
          </div>
        </div>

        <nav class="flex shrink-0 items-center gap-2">
          <a
            routerLink="/cart"
            routerLinkActive="ring-2 ring-blinkit-brand/40"
            class="relative inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-[13px] font-bold hover:shadow-soft"
          >
            <lucide-angular name="shopping-cart" class="h-[18px] w-[18px]" />
            <span class="hidden sm:inline">Cart</span>
            @if (totalItems() > 0) {
              <span
                class="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-blinkit-success px-1 text-[11px] font-extrabold text-white"
                >{{ totalItems() }}</span
              >
            }
          </a>
        </nav>
      </div>
    </header>
  `
})
export class NavbarComponent {
  private readonly router = inject(Router);
  private readonly cart = inject(CartService);

  readonly totalItems = this.cart.totalItems;

  readonly query = signal('');
  private readonly debounced = signal('');

  constructor() {
    const initialQ = (this.router.parseUrl(this.router.url).queryParams['q'] ?? '') as string;
    this.query.set(initialQ);

    effect(() => {
      const q = this.query().trim();
      const handle = setTimeout(() => this.debounced.set(q), 180);
      return () => clearTimeout(handle);
    });

    effect(() => {
      const q = this.debounced();
      const current = (this.router.parseUrl(this.router.url).queryParams['q'] ?? '') as string;
      if ((current ?? '').toString() === q) return;
      this.router.navigate([], {
        queryParams: q ? { q } : { q: null },
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
    });
  }

  onInput(value: string) {
    this.query.set(value);
  }
}

