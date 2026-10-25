
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AiStylistDialogService } from '../ai-stylist-dialog/ai-stylist-dialog.service';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './ai-btn.html',
  styleUrl: './ai-btn.scss'
})
export class AiBtnComponent {

  private readonly aiStylistService = inject(AiStylistDialogService)

  openAiStylist(){

  console.log('1. Button clicked');
    this.aiStylistService.open()
  console.log('2. Dialog service called');
  }
}
