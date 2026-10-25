
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchQuery = '';
  mobileSearchOpen = false;
  logoFailed = false;
  isHomePage = true;
  isScrolled = false;
  searchSubmitting = false;
  cartCount = 0;

  private navigationSubscription?: Subscription;

  constructor(private readonly router: Router) {}

  get isHeaderSolid(): boolean {
    return !this.isHomePage || this.isScrolled;
  }

  ngOnInit(): void {
    this.isHomePage = this.isHomeRoute(this.router.url);
    this.updateScrollState();

    this.navigationSubscription = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        this.isHomePage = this.isHomeRoute(event.urlAfterRedirects);
        this.updateScrollState();
        this.mobileSearchOpen = false;
      });
  }

  ngOnDestroy(): void {
    this.navigationSubscription?.unsubscribe();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateScrollState();
  }

  toggleMobileSearch(): void {
    this.mobileSearchOpen = !this.mobileSearchOpen;
  }

  async submitSearch(): Promise<void> {
    const query = this.searchQuery.trim();

    if (!query || this.searchSubmitting) {
      return;
    }

    this.searchSubmitting = true;

    try {
      const navigated = await this.router.navigate(['/ai-search'], {
        queryParams: { q: query },
      });

      if (navigated) {
        this.mobileSearchOpen = false;
      }
    } catch (error) {
      console.error('Unable to open search results:', error);
    } finally {
      this.searchSubmitting = false;
    }
  }

  onLogoError(): void {
    this.logoFailed = true;
  }

  private updateScrollState(): void {
    this.isScrolled =
      typeof window !== 'undefined' && window.scrollY > 28;
  }

  private isHomeRoute(url: string): boolean {
    const path = url.split(/[?#]/)[0];
    return path === '/' || path === '';
  }
}
