import { Component, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleComponent } from '../primitives/toggle/toggle.component';
import { IconButtonComponent } from '../primitives/icon-button/icon-button.component';
import { ButtonComponent } from '../primitives/button/button.component';

@Component({
  selector: 'SettingsModal',
  standalone: true,
  imports: [CommonModule, ToggleComponent, IconButtonComponent, ButtonComponent],
  templateUrl: './settings-modal.component.html'
})
export class SettingsModalComponent {
  @Input() isStartOnMonday!: boolean;
  @Output() toggleFirstDay = new EventEmitter<void>();
  @ViewChild('settingsDialog') dialog!: ElementRef<HTMLDialogElement>;

  open() {
    this.dialog.nativeElement.showModal();
  }

  close() {
    this.dialog.nativeElement.close();
  }

  onToggleFirstDay() {
    this.toggleFirstDay.emit();
  }

  otherFunction() {
    window.open('https://www.youtube.com/watch?v=c0-hvjV2A5Y', '_blank');
  }
} 