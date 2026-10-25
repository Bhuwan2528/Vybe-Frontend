
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface AiStylistDialogResult {
  image: File | null;
  prompt: string;
}

@Component({
  selector: 'app-ai-stylist-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './ai-stylist-dialog.html',
  styleUrl: './ai-stylist-dialog.scss',
})
export class AiStylistDialog implements OnDestroy {
  private readonly dialogRef =
    inject(MatDialogRef<AiStylistDialog, AiStylistDialogResult>);

  selectedImage: File | null = null;
  previewUrl: string | null = null;
  prompt = '';
  feedback = '';

  get canContinue(): boolean {
    return !!this.selectedImage || !!this.prompt.trim();
  }

  close(): void {
    this.dialogRef.close();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    // Allow choosing the same image again.
    input.value = '';

    if (file) {
      this.setImage(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();

    const file = event.dataTransfer?.files?.[0];

    if (file) {
      this.setImage(file);
    }
  }

  removeImage(): void {
    this.clearPreview();
    this.selectedImage = null;
    this.feedback = '';
  }

  continue(): void {
    if (!this.canContinue) {
      this.feedback = 'Upload a photo or describe your desired look.';
      return;
    }

    this.dialogRef.close({
      image: this.selectedImage,
      prompt: this.prompt.trim(),
    });
  }

  ngOnDestroy(): void {
    this.clearPreview();
  }

  private setImage(file: File): void {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    const validType =
      allowedTypes.includes(file.type) ||
      /\.(jpe?g|png|webp)$/i.test(file.name);

    if (!validType) {
      this.feedback = 'Choose a JPG, PNG or WEBP image.';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.feedback = 'Image size must be 5 MB or less.';
      return;
    }

    this.clearPreview();

    this.selectedImage = file;
    this.previewUrl = URL.createObjectURL(file);
    this.feedback = '';
  }

  private clearPreview(): void {
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = null;
    }
  }
}
