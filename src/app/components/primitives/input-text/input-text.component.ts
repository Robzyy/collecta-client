import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'InputTextComponent',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
  template: `
    <div class="space-y-1">
      <div class="flex w-full justify-between transition-opacity">
        <label
          [for]="formControlName"
          class="text-center text-sm font-medium text-text-950"
        >
          {{ label }}
        </label>
        <p
          class="text-right text-sm text-primary-500 opacity-0"
          [class.opacity-100]="error"
        >
          {{ error }}
        </p>
      </div>
      <input
        [type]="type"
        [id]="formControlName"
        [name]="formControlName"
        [value]="value"
        (input)="onChange($event)"
        (blur)="onTouched()"
        [autocomplete]="autoComplete"
        class="w-full rounded-md border-2 border-background-500 p-1 outline-none transition-colors hover:border-background-600 focus:border-background-700"
      />
    </div>
  `,
})
export class InputTextComponent implements ControlValueAccessor {
  @Input({ required: true }) label: string = '';
  @Input({ required: true }) type: string = '';
  @Input({ required: true }) formControlName: string = '';
  @Input() error: string = '';

  // See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
  @Input() autoComplete: string = 'off';

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = (event: any) => {
      fn(event.target.value);
    };
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
