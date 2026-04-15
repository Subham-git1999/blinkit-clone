import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {
  BadgeCheck,
  CheckCircle2,
  CreditCard,
  LucideAngularModule,
  MapPin,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShoppingCart,
  Sparkles,
  Trash2
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(
      LucideAngularModule.pick({
        MapPin,
        Search,
        ShoppingCart,
        Minus,
        Plus,
        Trash2,
        BadgeCheck,
        CreditCard,
        PackageCheck,
        CheckCircle2,
        Sparkles
      })
    )
  ]
};
