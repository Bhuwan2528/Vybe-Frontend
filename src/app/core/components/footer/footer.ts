import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  activeSection: string | null = null;
  email = '';
  newsletterMessage = '';

  toggleSection(section: string): void {
    this.activeSection =
      this.activeSection === section ? null : section;
  }

  subscribe(): void {
    if (!this.email.trim()) {
      return;
    }

    // Frontend demo only. API integration will be added later.
    this.newsletterMessage = 'Newsletter signup will be connected later.';
  }
}