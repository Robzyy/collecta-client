import { Component } from '@angular/core';

@Component({
  selector: 'SpacerComponent',
  standalone: true,
  imports: [],
  template: `
    <div class="mx-4 h-8 w-[3px] rounded-full bg-background-600 opacity-80"></div>
  `,
})
export class SpacerComponent {}
