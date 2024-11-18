import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'NumberInputComponent',
  standalone: true,
  imports: [],
  templateUrl: './number-input.component.html'
})
export class NumberInputComponent {
  @Input() value: number = 0;
  @Output() valueChange = new EventEmitter<number>();
  @Input({ required: true }) min: number = 0;
  @Input({ required: true }) max: number = 100;
  @Input() hasButtons: boolean = false;

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.valueChange.emit(value);
  }

  increment() {
    if (this.value < this.max) {
      this.value++;
      this.valueChange.emit(this.value);
    }
  }

  decrement() {
    if (this.value > this.min) {
      this.value--;
      this.valueChange.emit(this.value);
    }
  }
}
