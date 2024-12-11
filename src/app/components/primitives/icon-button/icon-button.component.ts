import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'IconButtonComponent',
  standalone: true,
  imports: [],
  template: `
    <button
      class="flex items-center justify-center rounded-full outline-none transition-colors"
      [class]="buttonClasses"
      title="{{ title }}"
      (click)="onClickHandler()"
    >
      <span class="material-symbols-outlined">{{ icon }}</span>
    </button>
  `,
})
export class IconButtonComponent {
  @Input({ required: true }) icon: string = '';
  @Input() title: string = '';
  @Input() variant: 'primary' | 'secondary' | 'disabled' | 'outline' | 'iconOnly' | 'alert' = 'primary';
  @Input() size: 'small' | 'default' | 'large' = 'default';
  @Output() callbackFunction = new EventEmitter<void>();

  get buttonClasses(): string {
    const classes = [
      // Size classes
      this.size === 'default' ? 'p-2' : '',
      this.size === 'small' ? 'p-1 text-sm' : '',
      this.size === 'large' ? 'p-3 text-lg' : '',

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
      this.variant === 'iconOnly'
        ? 'bg-transparent hover:bg-primary-200 hover:border-primary-500 active:bg-primary-500 active:border-primary-700'
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
