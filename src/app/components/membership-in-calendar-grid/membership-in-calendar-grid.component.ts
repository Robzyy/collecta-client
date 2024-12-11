import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Membership } from '../../interfaces/membership.interface';

@Component({
  selector: 'MembershipInCalendarGrid',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './membership-in-calendar-grid.component.html',
})
export class MembershipInCalendarGridComponent {
  @Input() memberships!: Membership[];
}
