import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header';
import { Footer } from './core/components/footer/footer';
import { AiBtnComponent } from './shared/components/ai-btn/ai-btn';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, Footer, AiBtnComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('vybe-frontend'); 
}
