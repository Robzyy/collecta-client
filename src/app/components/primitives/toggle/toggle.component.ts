import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ToggleComponent',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      (click)="onClick()"
      class="relative inline-flex h-6 w-11 items-center rounded-full"
      [class.bg-primary-800]="!isOn"
      [class.bg-primary-600]="isOn">
      <span class="sr-only">{{ label }}</span>
      <span
        class="inline-block h-4 w-4 transform rounded-full bg-primary-50 transition"
        [class.translate-x-6]="isOn"
        [class.translate-x-1]="!isOn">
      </span>
    </button>
  `
})
export class ToggleComponent {
  @Input() isOn = false;
  @Input() label = 'Toggle';
  @Output() toggle = new EventEmitter<void>();

  onClick() {
    this.toggle.emit();
  }
}