import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { LucideAngularModule } from 'lucide-angular';

type StepId = 'address' | 'payment' | 'review';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink,
    ReactiveFormsModule,
    LucideAngularModule
  ],
  template: `
    <section class="space-y-4">
      <div class="flex items-end justify-between">
        <div>
          <div class="font-display text-xl font-extrabold tracking-tight">Checkout</div>
          <div class="mt-1 text-[13px] font-medium text-black/60">
            A smooth, step-by-step flow with a mock payment screen.
          </div>
        </div>
        <a routerLink="/cart" class="text-[13px] font-extrabold hover:underline">Back to cart</a>
      </div>

      @if (totalItems() === 0) {
        <div class="rounded-2xl border border-black/5 bg-white p-8 text-center">
          <div class="text-[14px] font-extrabold">Nothing to checkout</div>
          <div class="mt-1 text-[13px] font-medium text-black/60">
            Add items first, then come back for the premium checkout.
          </div>
          <a
            routerLink="/"
            class="mt-5 inline-flex rounded-xl bg-blinkit-brand px-5 py-2.5 text-[13px] font-extrabold hover:brightness-95"
          >
            Browse products
          </a>
        </div>
      } @else {
        <div class="grid gap-4 lg:grid-cols-3">
          <div class="space-y-4 lg:col-span-2">
            <div class="rounded-2xl border border-black/5 bg-white p-4">
              <div class="flex items-center gap-2">
                <div class="grid h-9 w-9 place-items-center rounded-xl bg-blinkit-brand">
                  @switch (step()) {
                    @case ('address') { <lucide-angular name="map-pin" class="h-5 w-5" /> }
                    @case ('payment') { <lucide-angular name="credit-card" class="h-5 w-5" /> }
                    @case ('review') { <lucide-angular name="package-check" class="h-5 w-5" /> }
                  }
                </div>
                <div class="min-w-0">
                  <div class="text-[14px] font-extrabold">{{ stepTitle() }}</div>
                  <div class="text-[12px] font-semibold text-black/55">{{ stepSubtitle() }}</div>
                </div>
              </div>

              <div class="mt-4 grid grid-cols-3 gap-2">
                @for (s of steps; track s.id) {
                  <button
                    type="button"
                    (click)="goTo(s.id)"
                    class="rounded-xl border px-3 py-2 text-left"
                    [class.border-black/10]="s.id !== step()"
                    [class.bg-white]="s.id !== step()"
                    [class.bg-blinkit-brand]="s.id === step()"
                    [class.border-transparent]="s.id === step()"
                  >
                    <div class="text-[11px] font-extrabold text-black/60">STEP {{ s.n }}</div>
                    <div class="mt-0.5 text-[13px] font-extrabold">{{ s.label }}</div>
                  </button>
                }
              </div>
            </div>

            @switch (step()) {
              @case ('address') {
                <form class="rounded-2xl border border-black/5 bg-white p-4" [formGroup]="addressForm">
                  <div class="grid gap-3 sm:grid-cols-2">
                    <label class="space-y-1">
                      <div class="text-[12px] font-extrabold text-black/60">Full name</div>
                      <input
                        class="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-blinkit-brand/40"
                        formControlName="name"
                        placeholder="Subham Sharma"
                      />
                    </label>
                    <label class="space-y-1">
                      <div class="text-[12px] font-extrabold text-black/60">Phone</div>
                      <input
                        class="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-blinkit-brand/40"
                        formControlName="phone"
                        placeholder="99999 99999"
                      />
                    </label>
                    <label class="space-y-1 sm:col-span-2">
                      <div class="text-[12px] font-extrabold text-black/60">Address</div>
                      <input
                        class="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-blinkit-brand/40"
                        formControlName="address"
                        placeholder="221B, Premium Street, Bengaluru"
                      />
                    </label>
                    <label class="space-y-1 sm:col-span-2">
                      <div class="text-[12px] font-extrabold text-black/60">Delivery instructions (optional)</div>
                      <input
                        class="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-blinkit-brand/40"
                        formControlName="instructions"
                        placeholder="Ring the bell, leave at door"
                      />
                    </label>
                  </div>

                  <div class="mt-4 flex items-center justify-between gap-3">
                    <div class="text-[12px] font-semibold text-black/55">
                      @if (addressForm.invalid) {
                        Please fill required fields.
                      } @else {
                        Looks good.
                      }
                    </div>
                    <button
                      type="button"
                      (click)="nextFromAddress()"
                      [disabled]="addressForm.invalid"
                      class="inline-flex items-center justify-center rounded-xl bg-blinkit-brand px-4 py-2.5 text-[13px] font-extrabold text-blinkit-text disabled:opacity-50"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              }
              @case ('payment') {
                <form class="rounded-2xl border border-black/5 bg-white p-4" [formGroup]="paymentForm">
                  <div class="grid gap-3 sm:grid-cols-2">
                    <label class="space-y-1 sm:col-span-2">
                      <div class="text-[12px] font-extrabold text-black/60">Card number</div>
                      <input
                        class="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-blinkit-brand/40"
                        formControlName="card"
                        placeholder="4242 4242 4242 4242"
                        inputmode="numeric"
                      />
                    </label>
                    <label class="space-y-1">
                      <div class="text-[12px] font-extrabold text-black/60">Expiry</div>
                      <input
                        class="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-blinkit-brand/40"
                        formControlName="exp"
                        placeholder="12/30"
                      />
                    </label>
                    <label class="space-y-1">
                      <div class="text-[12px] font-extrabold text-black/60">CVV</div>
                      <input
                        class="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-blinkit-brand/40"
                        formControlName="cvv"
                        placeholder="123"
                        inputmode="numeric"
                      />
                    </label>
                  </div>

                  <div class="mt-4 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      (click)="step.set('address')"
                      class="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-[13px] font-extrabold hover:bg-black/5"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      (click)="nextFromPayment()"
                      [disabled]="paymentForm.invalid"
                      class="inline-flex items-center justify-center rounded-xl bg-blinkit-brand px-4 py-2.5 text-[13px] font-extrabold text-blinkit-text disabled:opacity-50"
                    >
                      Review order
                    </button>
                  </div>
                </form>
              }
              @case ('review') {
                <div class="rounded-2xl border border-black/5 bg-white p-4">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <div class="text-[14px] font-extrabold">Order summary</div>
                      <div class="mt-1 text-[12px] font-semibold text-black/55">
                        {{ totalItems() }} items • Delivered in 10 minutes
                      </div>
                    </div>
                    <div class="rounded-xl bg-[#f6f7f9] px-3 py-2 text-right">
                      <div class="text-[11px] font-extrabold text-black/60">PAYABLE</div>
                      <div class="text-[14px] font-extrabold">{{ subtotal() | currency : 'INR' : 'symbol' }}</div>
                    </div>
                  </div>

                  <div class="mt-4 space-y-2 text-[13px] font-semibold text-black/70">
                    @for (l of lines(); track l.product.id) {
                      <div class="flex items-center justify-between gap-3">
                        <div class="min-w-0 truncate">
                          {{ l.product.name }}
                          <span class="text-black/40">× {{ l.qty }}</span>
                        </div>
                        <div class="shrink-0 font-extrabold text-blinkit-text">
                          {{ l.product.price * l.qty | currency : 'INR' : 'symbol' }}
                        </div>
                      </div>
                    }
                  </div>

                  <div class="mt-5 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      (click)="step.set('payment')"
                      class="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-[13px] font-extrabold hover:bg-black/5"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      (click)="pay()"
                      [disabled]="processing()"
                      class="inline-flex items-center justify-center gap-2 rounded-xl bg-blinkit-success px-5 py-2.5 text-[13px] font-extrabold text-white disabled:opacity-60"
                    >
                      @if (!processing()) {
                        <lucide-angular name="badge-check" class="h-5 w-5" />
                        Pay {{ subtotal() | currency : 'INR' : 'symbol' }}
                      } @else {
                        Processing…
                      }
                    </button>
                  </div>
                </div>
              }
            }
          </div>

          <aside class="rounded-2xl border border-black/5 bg-white p-4 lg:sticky lg:top-[88px]">
            <div class="text-[14px] font-extrabold">Delivery</div>
            <div class="mt-3 rounded-2xl bg-[#f6f7f9] p-3">
              <div class="text-[11px] font-extrabold text-black/60">ETA</div>
              <div class="mt-0.5 text-[14px] font-extrabold">10 mins</div>
              <div class="mt-2 text-[12px] font-semibold text-black/55">
                Packed with care. Delivered fast.
              </div>
            </div>

            <div class="mt-4 text-[13px] font-semibold text-black/70">
              <div class="flex items-center justify-between">
                <span>Items</span>
                <span>{{ totalItems() }}</span>
              </div>
              <div class="mt-2 flex items-center justify-between">
                <span>Total</span>
                <span class="font-extrabold text-blinkit-text">
                  {{ subtotal() | currency : 'INR' : 'symbol' }}
                </span>
              </div>
            </div>
          </aside>
        </div>
      }
    </section>
  `
})
export class CheckoutPage {
  private readonly cart = inject(CartService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly lines = this.cart.lines;
  readonly totalItems = this.cart.totalItems;
  readonly subtotal = this.cart.subtotal;

  readonly step = signal<StepId>('address');
  readonly processing = signal(false);

  readonly steps = [
    { id: 'address' as const, n: 1, label: 'Address' },
    { id: 'payment' as const, n: 2, label: 'Payment' },
    { id: 'review' as const, n: 3, label: 'Review' }
  ];

  readonly stepTitle = computed(() => {
    switch (this.step()) {
      case 'address':
        return 'Delivery address';
      case 'payment':
        return 'Payment method';
      case 'review':
        return 'Confirm & pay';
    }
  });

  readonly stepSubtitle = computed(() => {
    switch (this.step()) {
      case 'address':
        return 'Where should we deliver?';
      case 'payment':
        return 'Mock card details for demo.';
      case 'review':
        return 'One last look before success.';
    }
  });

  readonly addressForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    instructions: ['']
  });

  readonly paymentForm = this.fb.nonNullable.group({
    card: ['', [Validators.required, Validators.minLength(12)]],
    exp: ['', Validators.required],
    cvv: ['', [Validators.required, Validators.minLength(3)]]
  });

  goTo(id: StepId) {
    if (id === 'payment' && this.addressForm.invalid) return;
    if (id === 'review' && (this.addressForm.invalid || this.paymentForm.invalid)) return;
    this.step.set(id);
  }

  nextFromAddress() {
    this.addressForm.markAllAsTouched();
    if (this.addressForm.invalid) return;
    this.step.set('payment');
  }

  nextFromPayment() {
    this.paymentForm.markAllAsTouched();
    if (this.paymentForm.invalid) return;
    this.step.set('review');
  }

  async pay() {
    if (this.processing()) return;
    this.processing.set(true);
    await new Promise((r) => setTimeout(r, 900));
    await this.router.navigateByUrl('/checkout/success');
    this.cart.clear();
  }
}

