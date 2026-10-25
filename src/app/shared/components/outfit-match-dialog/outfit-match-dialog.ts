import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

export enum OutfitOccasion {
  COLLEGE = 'college',
  DATE = 'date',
  PARTY = 'party',
  DAILY_WEAR = 'daily-wear',
  TRAVEL = 'travel',
  FORMAL = 'formal',
}

export enum OutfitStyle {
  STREETWEAR = 'streetwear',
  MINIMAL_CLASSY = 'minimal-classy',
  CASUAL = 'casual',
  TRENDY = 'trendy',
  SMART_CASUAL = 'smart-casual',
  AESTHETIC = 'aesthetic',
}

export interface OutfitMatchProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  category?: string;
}

export interface OutfitMatchFormValue {
  occasion: OutfitOccasion;
  style: OutfitStyle;
  budget?: number;
  message?: string;
}

@Component({
  selector: 'app-outfit-match-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './outfit-match-dialog.html',
  styleUrl: './outfit-match-dialog.scss',
})
export class OutfitMatchDialogComponent implements OnDestroy {
  readonly product = inject<OutfitMatchProduct>(MAT_DIALOG_DATA);

  private readonly dialogRef =
    inject(MatDialogRef<OutfitMatchDialogComponent>);

  occasions = [
    { label: 'College', value: OutfitOccasion.COLLEGE },
    { label: 'Date', value: OutfitOccasion.DATE },
    { label: 'Party', value: OutfitOccasion.PARTY },
    { label: 'Daily Wear', value: OutfitOccasion.DAILY_WEAR },
    { label: 'Travel', value: OutfitOccasion.TRAVEL },
    { label: 'Formal', value: OutfitOccasion.FORMAL },
  ];

  styles = [
    { label: 'Streetwear', value: OutfitStyle.STREETWEAR },
    { label: 'Minimal Classy', value: OutfitStyle.MINIMAL_CLASSY },
    { label: 'Casual', value: OutfitStyle.CASUAL },
    { label: 'Trendy', value: OutfitStyle.TRENDY },
    { label: 'Smart Casual', value: OutfitStyle.SMART_CASUAL },
    { label: 'Aesthetic', value: OutfitStyle.AESTHETIC },
  ];

  occasion: OutfitOccasion | null = null;
  style: OutfitStyle | null = null;
  budget: number | null = null;
  message = '';

  submitted = false;
  isProcessing = false;
  completedSteps = 0;

  formValue: OutfitMatchFormValue | null = null;

  private timers: ReturnType<typeof setTimeout>[] = [];

  get validBudget(): boolean {
    return (
      this.budget === null ||
      (
        Number.isInteger(this.budget) &&
        this.budget >= 1 &&
        this.budget <= 100000
      )
    );
  }

  get canSubmit(): boolean {
    return !!this.occasion && !!this.style && this.validBudget;
  }

  selectOccasion(value: OutfitOccasion): void {
    this.occasion = value;
  }

  selectStyle(value: OutfitStyle): void {
    this.style = value;
  }

  formatLabel(value: string | null): string {
    return value
      ? value
          .split('-')
          .map(word => word[0].toUpperCase() + word.slice(1))
          .join(' ')
      : '';
  }

  // submit(): void {
  //   this.submitted = true;

  //   if (!this.canSubmit || this.isProcessing) return;

  //   this.formValue = {
  //     occasion: this.occasion!,
  //     style: this.style!,
  //     ...(this.budget !== null ? { budget: this.budget } : {}),
  //     ...(this.message.trim()
  //       ? { message: this.message.trim() }
  //       : {}),
  //   };

  //   // UI preview only. Backend API will be connected later.
  //   this.isProcessing = true;
  //   this.completedSteps = 0;

  //   this.timers.push(
  //     setTimeout(() => {
  //       this.completedSteps = 1;
  //     }, 500),
  //   );

  //   this.timers.push(
  //     setTimeout(() => {
  //       this.completedSteps = 2;
  //     }, 1000),
  //   );
  // }

  backToForm(): void {
    this.clearTimers();
    this.isProcessing = false;
    this.completedSteps = 0;
  }

  close(): void {
    this.clearTimers();
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  private clearTimers(): void {
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers = [];
  }

  submit(): void {
  this.submitted = true;

  if (!this.canSubmit) return;

  this.isProcessing = true;
}
}