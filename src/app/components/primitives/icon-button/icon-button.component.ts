import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'IconButtonComponent',
  standalone: true,
  imports: [],
  template: `
    <button class="p-2 rounded-full size-12 hover:bg-primary-900 active:bg-primary-800 transition-colors flex items-center justify-center"
    [class.size-9]="size == 'small'"
    [class.size-12]="size == 'default'"
    title="{{title}}" (click)="onClickHandler()">
        <span class="material-symbols-outlined">{{icon}}</span>
    </button>
  `
})
export class IconButtonComponent {
  @Input({ required: true }) icon: string = '';
  @Input() title: string = '';
  @Input() size: 'small' | 'default' = 'default';
  @Output() callbackFunction = new EventEmitter<void>();

  onClickHandler() {
    this.callbackFunction.emit();
  }
}