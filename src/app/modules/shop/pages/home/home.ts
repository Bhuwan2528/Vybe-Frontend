import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AfterViewInit, ElementRef, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {


readonly categories = [
  { name: 'T-Shirts', slug: 't-shirts', image: '/images/categories/t-shirts.webp' },
  { name: 'Shirts', slug: 'shirts', image: '/images/categories/shirts.webp' },
  { name: 'Cargos', slug: 'cargos', image: '/images/categories/cargos.webp' },
  { name: 'Hoodies', slug: 'hoodies', image: '/images/categories/hoodies.webp' },
  { name: 'Jackets', slug: 'jackets', image: '/images/categories/jackets.webp' },
  { name: 'Co-ords', slug: 'co-ords', image: '/images/categories/co-ords.webp' },
  { name: 'Sweatshirts', slug: 'sweatshirts', image: '/images/categories/hoodies.webp' },
  { name: 'Jeans', slug: 'jeans', image: '/images/categories/cargos.webp' },
  { name: 'Shorts', slug: 'shorts', image: '/images/categories/cargos.webp' },
  { name: 'Overshirts', slug: 'overshirts', image: '/images/categories/jackets.webp' },
  { name: 'Polos', slug: 'polos', image: '/images/categories/shirts.webp' },
  { name: 'Tank Tops', slug: 'tank-tops', image: '/images/categories/t-shirts.webp' },
];

@ViewChild('categoryTrack')
categoryTrack?: ElementRef<HTMLDivElement>;

private categoryTimer?: ReturnType<typeof setInterval>;

ngAfterViewInit(): void {
  this.startCategoryAutoScroll();
}

ngOnDestroy(): void {
  this.stopCategoryAutoScroll();
}

pauseCategoryAutoScroll(): void {
  this.stopCategoryAutoScroll();
}

resumeCategoryAutoScroll(): void {
  this.startCategoryAutoScroll();
}

private stopCategoryAutoScroll(): void {
  if (this.categoryTimer) {
    clearInterval(this.categoryTimer);
    this.categoryTimer = undefined;
  }
}

private startCategoryAutoScroll(): void {
  this.stopCategoryAutoScroll();

  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return;
  }

  this.categoryTimer = setInterval(() => {
    const track = this.categoryTrack?.nativeElement;
    const firstCard = track?.querySelector<HTMLElement>('.shop-category-card');

    if (!track || !firstCard) {
      return;
    }

    const gap = parseFloat(getComputedStyle(track).gap) || 12;
    const step = firstCard.getBoundingClientRect().width + gap;
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (maxScroll <= 1) {
      return;
    }

    if (track.scrollLeft + step >= maxScroll - 2) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: step, behavior: 'smooth' });
    }
  }, 3800);
}



aiSearchMessage = '';
selectedAiImageName = '';

submitAiSearch(query: string, event: Event): void {
  event.preventDefault();

  const search = query.trim();

  if (!search) {
    return;
  }

  // Frontend demo only — API integration later.
  this.aiSearchMessage = `Your style prompt is ready: "${search}"`;
}

tryAiExample(input: HTMLInputElement): void {
  input.value = 'white oversized tee with olive cargos under 1000';
  input.focus();

  this.aiSearchMessage = '';
}

onAiImageSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) {
    return;
  }

  if (!file.type.startsWith('image/')) {
    this.aiSearchMessage = 'Please select an image file.';
    input.value = '';
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    this.aiSearchMessage = 'Image size must be under 10 MB.';
    input.value = '';
    return;
  }

  this.selectedAiImageName = file.name;
  this.aiSearchMessage = `Image selected: ${file.name}`;
}
  
}
