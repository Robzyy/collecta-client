import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Membership } from '../../interfaces/membership.interface';
import { HttpClient } from '@angular/common/http';
import { AddMembershipModalComponent } from '../modals/add-membership-modal/add-membership-modal.component';
import { ButtonComponent } from '../primitives/button/button.component';
import { IconButtonComponent } from '../primitives/icon-button/icon-button.component';

@Component({
  selector: 'MembershipInDialog',
  standalone: true,
  imports: [CommonModule, AddMembershipModalComponent, ButtonComponent, IconButtonComponent],
  templateUrl: './membership-in-dialog.component.html',
})
export class MembershipInDialogComponent {
  @Input() memberships!: Membership[];
  @Output() membershipDeleted = new EventEmitter<string>();
  @Output() membershipUpdated = new EventEmitter<Membership>();
  @ViewChild('membershipModal') membershipModal!: AddMembershipModalComponent;

  constructor(private http: HttpClient) {}

  deleteMembership(id: string) {
    if (confirm('Are you sure you want to delete this membership?')) {
      this.http.delete(`/api/v1/memberships/${id}`).subscribe({
        next: () => {
          this.membershipDeleted.emit(id);
        },
        error: (error) => {
          console.error('Error deleting membership:', error);
        },
      });
    }
  }

  modifyMembership(membership: Membership) {
    this.membershipModal.openForEdit(membership);
  }

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
          'This is a free trial, to end after ' +
          membership.recurrencePattern?.endAfterOccurrences +
          ' occurrences';
        break;
      }
      default: {
        outputString = 'UNKNOWN FREQUENCY';
      }
    }
    return outputString;
  }
}
