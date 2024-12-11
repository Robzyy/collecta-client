import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Membership } from '../../interfaces/membership.interface';

@Component({
  selector: 'MembershipComponent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './membership.component.html',
})
export class MembershipComponent {
  @Input() memberships!: Membership[];

  printFrequency(membership: Membership) {
    if (!membership.recurrencePattern?.frequency) return '';

    let outputString: string = '';
    switch (membership.recurrencePattern?.frequency) {
      case 'daily': {
        if (membership.recurrencePattern?.interval === 1) {
          outputString = 'Renews daily';
        } else {
          outputString = `Renews every ${membership.recurrencePattern?.interval} days`;
        }
        break;
      }
      case 'weekly': {
        if (membership.recurrencePattern?.interval === 1) {
          outputString = 'Renews weekly';
        } else {
          outputString = `Renews every ${membership.recurrencePattern?.interval} weeks`;
        }
        break;
      }
      case 'monthly': {
        if (membership.recurrencePattern?.interval === 1) {
          outputString = 'Renews monthly';
        } else {
          outputString = `Renews every ${membership.recurrencePattern?.interval} months`;
        }
        break;
      }
      case 'yearly': {
        if (membership.recurrencePattern?.interval === 1) {
          outputString = 'Renews yearly';
        } else {
          outputString = `Renews every ${membership.recurrencePattern?.interval} years`;
        }
        break;
      }
      case 'freeTrial': {
        outputString =
          'This is a free trial, to end on ' +
          membership.recurrencePattern?.endAfterOccurrences;
        break;
      }
      default: {
        outputString = 'UNKNOWN FREQUENCY';
      }
    }
    return outputString;
  }
}
