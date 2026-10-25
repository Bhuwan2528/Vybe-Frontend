
import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AiStylistDialog, AiStylistDialogResult } from './ai-stylist-dialog';

@Injectable({
  providedIn: 'root',
})
export class AiStylistDialogService {
  private readonly dialog = inject(MatDialog);

  open() {
    const dialogRef = this.dialog.open<
      AiStylistDialog,
      void,
      AiStylistDialogResult
    >(AiStylistDialog, {
      width: '520px',
      maxWidth: 'calc(100vw - 24px)',
      maxHeight: 'calc(100dvh - 24px)',
      autoFocus: false,
      restoreFocus: true,
      panelClass: 'ai-stylist-dialog-panel',
      backdropClass: 'ai-stylist-backdrop',
    });

    return dialogRef.afterClosed();
  }
}
