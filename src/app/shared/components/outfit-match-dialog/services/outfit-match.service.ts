import { Injectable, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { OutfitMatchDialogComponent, OutfitMatchProduct } from '../outfit-match-dialog';


@Injectable({
  providedIn: 'root',
})
export class OutfitMatchDialogService {
  private readonly dialog = inject(MatDialog);

  open(
    product?: OutfitMatchProduct,
  ): MatDialogRef<OutfitMatchDialogComponent> {
    return this.dialog.open(OutfitMatchDialogComponent, {
      data: product,
      width: '520px',
      maxWidth: 'calc(100vw - 32px)',
      maxHeight: 'min(90dvh, 820px)',
      autoFocus: false,
      restoreFocus: true,
      panelClass: 'ai-stylist-dialog-panel',
      backdropClass: 'ai-stylist-backdrop',
    });
  }
}