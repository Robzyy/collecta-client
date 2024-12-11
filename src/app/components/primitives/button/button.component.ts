import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ButtonComponent',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input({ required: true }) label: string = '';
  @Input() variant: 'primary' | 'secondary' | 'disabled' | 'outline' | 'alert' =
    'primary';
  @Input() leadingIcon: string = '';
  @Input() trailingIcon: string = '';
  @Input() size: 'small' | 'default' | 'large' = 'default';
  @Input() fontWeight:
    | 'thin'
    | 'extralight'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black' = 'normal';
  @Output() callbackFunction = new EventEmitter<void>();

  get buttonClasses(): string {
    const classes = [
      // Size classes
      this.size === 'default' ? 'px-6 py-2' : '',
      this.size === 'small' ? 'text-sm px-3 py-1' : '',
      this.size === 'large' ? 'text-lg px-5 py-2' : '',

      // Font weight classes
      this.fontWeight === 'thin' ? 'font-thin' : '',
      this.fontWeight === 'extralight' ? 'font-extralight' : '',
      this.fontWeight === 'light' ? 'font-light' : '',
      this.fontWeight === 'normal' ? 'font-normal' : '',
      this.fontWeight === 'medium' ? 'font-medium' : '',

      // Variant classes
      this.variant === 'primary'
        ? 'bg-primary-200 hover:bg-primary-400 active:bg-primary-600 text-text-950'
        : '',
      this.variant === 'secondary'
        ? 'bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700'
        : '',
      this.variant === 'disabled'
        ? 'bg-primary-200 text-text-900 cursor-default'
        : '',
      this.variant === 'outline'
        ? 'border border-background-600 bg-transparent hover:bg-primary-200 hover:border-primary-500 active:bg-primary-500 active:border-primary-700'
        : '',
      this.variant === 'alert'
        ? 'bg-alert-500 hover:bg-alert-800 active:bg-alert-700 text-text-200'
        : '',
    ];

    return classes.filter(Boolean).join(' ');
  }

  onClickHandler() {
    if (this.variant !== 'disabled') {
      this.callbackFunction.emit();
    }
  }
}
