import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Membership } from '../../interfaces/membership.interface';

@Component({
  selector: 'MembershipInCalendarGrid',
  standalone: true,
  imports: [],
  templateUrl: './membership-in-calendar-grid.component.html'
})
export class MembershipInCalendarGridComponent {
  @Input() memberships!: Membership[];

}
