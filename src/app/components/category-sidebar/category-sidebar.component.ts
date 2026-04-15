import { Component, input, output } from '@angular/core';
import { Category, CategoryId } from '../../models/product';

@Component({
  selector: 'app-category-sidebar',
  standalone: true,
  template: `
    <aside class="w-full md:w-56 lg:w-60">
      <div class="hidden md:block rounded-2xl border border-black/5 bg-white p-3">
        <div class="px-2 pb-2 text-[12px] font-extrabold tracking-wide text-black/60">CATEGORIES</div>
        <div class="space-y-1">
          <button
            type="button"
            (click)="select.emit('all')"
            class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] font-semibold transition"
            [class.bg-blinkit-brand]="selectedId() === 'all'"
            [class.hover:bg-black/5]="selectedId() !== 'all'"
          >
            <span>All</span>
            @if (selectedId() === 'all') {
              <span class="text-[11px] font-extrabold">✓</span>
            }
          </button>

          @for (c of categories(); track c.id) {
            <button
              type="button"
              (click)="select.emit(c.id)"
              class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] font-semibold transition"
              [class.bg-blinkit-brand]="c.id === selectedId()"
              [class.text-blinkit-text]="true"
              [class.hover:bg-black/5]="c.id !== selectedId()"
            >
              <span>{{ c.label }}</span>
              @if (c.id === selectedId()) {
                <span class="text-[11px] font-extrabold">✓</span>
              }
            </button>
          }
        </div>
      </div>

      <div class="md:hidden -mx-3 px-3">
        <div class="flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            (click)="select.emit('all')"
            class="shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-bold"
            [class.border-black/10]="selectedId() !== 'all'"
            [class.bg-white]="selectedId() !== 'all'"
            [class.bg-blinkit-brand]="selectedId() === 'all'"
            [class.border-transparent]="selectedId() === 'all'"
          >
            All
          </button>
          @for (c of categories(); track c.id) {
            <button
              type="button"
              (click)="select.emit(c.id)"
              class="shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-bold"
              [class.border-black/10]="c.id !== selectedId()"
              [class.bg-white]="c.id !== selectedId()"
              [class.bg-blinkit-brand]="c.id === selectedId()"
              [class.border-transparent]="c.id === selectedId()"
            >
              {{ c.label }}
            </button>
          }
        </div>
      </div>
    </aside>
  `
})
export class CategorySidebarComponent {
  readonly categories = input.required<Category[]>();
  readonly selectedId = input<CategoryId | 'all'>('all');
  readonly select = output<CategoryId | 'all'>();
}

