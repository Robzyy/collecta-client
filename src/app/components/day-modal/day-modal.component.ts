import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Membership } from '../../interfaces/membership.interface';
import { MembershipInDialogComponent } from '../membership-in-dialog/membership-in-dialog.component';
import { IconButtonComponent } from '../primitives/icon-button/icon-button.component';
@Component({
  selector: 'DayModal',
  standalone: true,
  imports: [CommonModule, MembershipInDialogComponent, IconButtonComponent],
  templateUrl: './day-modal.component.html'
})
export class DayModalComponent {
  @Input() memberships!: Membership[];
  @Input() selectedDate!: Date;
  @ViewChild('dayDialog') dialog!: ElementRef<HTMLDialogElement>;

  open() {
    this.dialog.nativeElement.showModal();
  }

  close() {
    this.dialog.nativeElement.close();
  }
}
