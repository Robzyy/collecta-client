import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Membership } from '../../../interfaces/membership.interface';
import { MembershipInDialogComponent } from '../../membership-in-dialog/membership-in-dialog.component';
import { IconButtonComponent } from '../../primitives/icon-button/icon-button.component';
import { ButtonComponent } from '../../primitives/button/button.component';

@Component({
  selector: 'DayModal',
  standalone: true,
  imports: [
    CommonModule,
    MembershipInDialogComponent,
    IconButtonComponent,
    ButtonComponent,
  ],
  templateUrl: './day-modal.component.html',
})
export class DayModalComponent {
  @Input() memberships: Membership[] = [];
  @Input() selectedDate!: Date;
  @ViewChild('dayDialog') dialog!: ElementRef<HTMLDialogElement>;
  @Output() addMembershipClick = new EventEmitter<void>();

  onMembershipDeleted(membershipId: string) {
    this.memberships = this.memberships.filter((m) => m.id !== membershipId);
  }

  onMembershipUpdated(updatedMembership: Membership) {
    const index = this.memberships.findIndex(
      (m) => m.id === updatedMembership.id,
    );
    if (index !== -1) {
      this.memberships[index] = updatedMembership;
      this.memberships = [...this.memberships];
    }
  }

  onMembershipCreated(newMembership: Membership) {
    this.memberships = [...this.memberships, newMembership];
  }

  open() {
    this.dialog.nativeElement.showModal();
  }

  close() {
    this.dialog.nativeElement.close();
  }

  addMembership() {
    this.addMembershipClick.emit();
  }

  trackById(index: number, membership: Membership): string {
    return membership.id;
  }
}
