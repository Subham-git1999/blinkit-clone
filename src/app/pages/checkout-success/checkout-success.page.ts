import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-checkout-success-page',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  template: `
    <section class="mx-auto max-w-2xl">
      <div class="rounded-3xl border border-black/5 bg-white p-6 sm:p-10">
        <div class="flex items-start gap-4">
          <div class="grid h-14 w-14 place-items-center rounded-2xl bg-blinkit-success text-white">
            <lucide-angular name="check-circle-2" class="h-7 w-7" />
          </div>
          <div class="min-w-0">
            <div class="font-display text-2xl font-extrabold tracking-tight">Payment successful</div>
            <div class="mt-1 text-[13px] font-medium text-black/60">
              Your order is confirmed. Rider is on the way.
            </div>
          </div>
        </div>

        <div class="mt-6 grid gap-3 sm:grid-cols-2">
          <div class="rounded-2xl bg-[#f6f7f9] p-4">
            <div class="text-[11px] font-extrabold text-black/60">DELIVERY ETA</div>
            <div class="mt-1 text-[16px] font-extrabold">10 mins</div>
            <div class="mt-2 text-[12px] font-semibold text-black/55">Packed fresh, delivered fast.</div>
          </div>
          <div class="rounded-2xl bg-[#f6f7f9] p-4">
            <div class="flex items-center gap-2">
              <lucide-angular name="sparkles" class="h-4 w-4 text-black/70" />
              <div class="text-[11px] font-extrabold text-black/60">STATUS</div>
            </div>
            <div class="mt-1 text-[16px] font-extrabold">Order placed</div>
            <div class="mt-2 text-[12px] font-semibold text-black/55">Mock success screen for demo.</div>
          </div>
        </div>

        <div class="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            routerLink="/"
            class="inline-flex flex-1 items-center justify-center rounded-xl bg-blinkit-brand px-5 py-3 text-[13px] font-extrabold text-blinkit-text hover:brightness-95"
          >
            Continue shopping
          </a>
          <a
            routerLink="/"
            class="inline-flex flex-1 items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 text-[13px] font-extrabold hover:bg-black/5"
          >
            Track order (mock)
          </a>
        </div>
      </div>
    </section>
  `
})
export class CheckoutSuccessPage {}

