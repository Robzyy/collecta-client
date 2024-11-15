import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ButtonComponent',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input({ required: true }) label: string = '';
  @Input() variant: 'primary' | 'secondary' | 'disabled' = 'primary';
  @Input() leadingIcon: string = '';
  @Input() trailingIcon: string = '';
  @Input() size: 'small' | 'default' | 'large' = 'default';
  @Input() fontWeight: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black' = 'normal';
  @Output() callbackFunction = new EventEmitter<void>();

  get buttonClasses(): string {
    const classes = [
      // Size classes
      this.size === 'small' ? 'text-sm px-3 py-1' : '',
      this.size === 'large' ? 'text-lg px-5 py-2' : '',

      // Font weight classes
      this.fontWeight === 'thin' ? 'font-thin' : '',
      this.fontWeight === 'extralight' ? 'font-extralight' : '',
      this.fontWeight === 'light' ? 'font-light' : '',
      this.fontWeight === 'normal' ? 'font-normal' : '',
      this.fontWeight === 'medium' ? 'font-medium' : '',

      // Variant classes
      this.variant === 'primary' ? 'bg-primary-900 hover:bg-primary-800 active:bg-primary-700' : '',
      this.variant === 'secondary' ? 'bg-secondary-800 hover:bg-secondary-700 active:bg-secondary-600' : '',
      this.variant === 'disabled' ? 'bg-text-800 text-text-900 cursor-default' : '',
    ];

    return classes.filter(Boolean).join(' ');
  }

  onClickHandler() {
    this.callbackFunction.emit();
  }
}
