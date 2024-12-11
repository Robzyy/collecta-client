import { Component } from '@angular/core';
import { SliderComponent } from '../primitives/slider/slider.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonComponent } from '../primitives/button/button.component';
import { InputTextComponent } from '../primitives/input-text/input-text.component';
import { IconButtonComponent } from '../primitives/icon-button/icon-button.component';
import { NumberInputComponent } from '../primitives/number-input/number-input.component';

@Component({
  selector: 'DebugPage',
  standalone: true,
  imports: [
    SliderComponent,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputTextComponent,
    IconButtonComponent,
    NumberInputComponent,
  ],
  templateUrl: './debug.component.html',
})
export class DebugComponent {
  myForm: FormGroup;

  sliders: any[] = [
    {
      value: 5,
      min: 0,
      max: 100,
      step: 5,
      label: 'Slider 1',
      callback: (value: number) => {
        console.log('Slider 1 changed to', value);
        this.sliders[0].value = value;
      },
    },
    {
      value: 5,
      min: 0,
      max: 10,
      step: 'any',
      label: 'Slider 2',
      callback: (value: number) => {
        this.sliders[1].value = value;
        console.log('Slider 2 changed to', value);
      },
    },
  ];

  numberInputValues: any[] = [
    {
      number: 0,
      callback: (value: number) => {
        console.log('Number input 1 changed to', value);
      },
    },
    {
      number: 0,
      callback: (value: number) => {
        console.log('Number input 2 changed to', value);
      },
    },
  ];

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      inputText: [''],
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
  }

  logClick() {
    console.log('clicked');
  }
}
