import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'InputTextComponent',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ],
  template: `
    <div class="space-y-1">
      <div class="flex justify-between w-full transition-opacity">
        <label [for]="formControlName" class="text-text-100 font-medium text-sm text-center">
          {{label}}
        </label>
        <p class="text-primary-500 text-sm  opacity-0 text-right"
          [class.opacity-100]="error">{{error}}</p>
      </div>
      <input
        [type]="type"
        [id]="formControlName"
        [name]="formControlName"
        [value]="value"
        (input)="onChange($event)"
        (blur)="onTouched()"
        [autocomplete]="autoComplete"
        class="rounded-md w-full p-1 border-2 border-primary-900 hover:border-primary-800 focus:border-primary-700 outline-none transition-colors"
      />

    </div>
  `
})
export class InputTextComponent implements ControlValueAccessor {
  @Input({ required: true }) label: string = '';
  @Input({ required: true }) type: string = '';
  @Input({ required: true }) formControlName: string = '';
  @Input() error: string = '';

  // See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
  @Input() autoComplete: string = 'off';

  value: string = '';
  onChange: any = () => { };
  onTouched: any = () => { };

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
