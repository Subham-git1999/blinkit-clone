import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FloatingCartComponent } from './components/floating-cart/floating-cart.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, FloatingCartComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
