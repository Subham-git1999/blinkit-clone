import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="border-t border-black/5 bg-white">
      <div class="mx-auto grid w-full max-w-7xl gap-4 px-3 py-8 sm:px-4 lg:px-6 md:grid-cols-3">
        <div>
          <div class="font-display text-lg font-extrabold tracking-tight">blinkit</div>
          <p class="mt-1 text-[13px] text-black/60">
            A high-end Angular UI inspired by the Blinkit web experience.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-2 text-[13px] font-semibold text-black/70">
          <a routerLink="/" class="hover:text-black">Home</a>
          <a routerLink="/cart" class="hover:text-black">Cart</a>
          <a routerLink="/checkout" class="hover:text-black">Checkout</a>
          <a href="#" class="pointer-events-none opacity-60">Support</a>
        </div>

        <div class="text-[12px] text-black/50 md:text-right">
          © {{ year }} blinkit-clone • Built with Angular Signals + Tailwind
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}

