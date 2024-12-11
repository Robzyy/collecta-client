import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../primitives/button/button.component';

@Component({
  selector: 'Main',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <div class="h-screen w-full bg-background-950 text-text-100">
      <div class="flex justify-center gap-4 p-5">
        <ButtonComponent
          label="Register"
          leadingIcon="person_add"
          [routerLink]="['/register']"
          (callbackFunction)="callback()"
        ></ButtonComponent>
        <ButtonComponent
          label="Calendar"
          leadingIcon="calendar_month"
          [routerLink]="['/calendar']"
          (callbackFunction)="callback()"
        ></ButtonComponent>
      </div>
    </div>
  `,
})
export class MainComponent {
  callback() {
    // Just because I HAVE to pass a callback function
  }
}
