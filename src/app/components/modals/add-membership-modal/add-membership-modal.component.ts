import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextComponent } from '../../primitives/input-text/input-text.component';
import { ButtonComponent } from '../../primitives/button/button.component';
import { IconButtonComponent } from '../../primitives/icon-button/icon-button.component';
import { HttpClient } from '@angular/common/http';
import { Membership } from '../../../interfaces/membership.interface';

@Component({
  selector: 'AddMembershipModal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    ButtonComponent,
    IconButtonComponent
  ],
  templateUrl: './add-membership-modal.component.html'
})
export class AddMembershipModalComponent {
  @ViewChild('membershipDialog') dialog!: ElementRef<HTMLDialogElement>;
  @Input() selectedDate?: Date;
  @Output() membershipCreated = new EventEmitter<Membership>();
  membershipForm: FormGroup;
  private editingMembershipId: string | null = null;

  frequencies = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
    { value: 'freeTrial', label: 'Free Trial' },
  ];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
  ) {
    this.membershipForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      cost: [null, [Validators.required, Validators.min(0)]],
      currency: ['USD', Validators.required],
      recurrencePattern: this.fb.group({
        frequency: ['monthly', Validators.required],
        interval: [1, [Validators.required, Validators.min(1)]],
        endAfterOccurrences: [null],
      }),
    });
  }

  open() {
    if (this.selectedDate) {
      this.membershipForm.patchValue({
        startDate: this.formatDateForInput(this.selectedDate),
      });
    } else {
      this.membershipForm.patchValue({
        startDate: this.formatDateForInput(new Date()),
      });
    }
    this.dialog.nativeElement.showModal();
  }

  openForEdit(membership: Membership) {
    this.editingMembershipId = membership.id;
    this.membershipForm.patchValue({
      title: membership.title,
      description: membership.description,
      startDate: this.formatDateForInput(new Date(membership.startDate)),
      cost: membership.cost,
      currency: membership.currency,
      recurrencePattern: {
        frequency: membership.recurrencePattern?.frequency,
        interval: membership.recurrencePattern?.interval,
        endAfterOccurrences: membership.recurrencePattern?.endAfterOccurrences,
      },
    });
    this.dialog.nativeElement.showModal();
  }

  onSubmit() {
    if (this.membershipForm.valid) {
      const endpoint = this.editingMembershipId
        ? `/api/v1/memberships/${this.editingMembershipId}`
        : '/api/v1/memberships';
      
      const method = this.editingMembershipId ? 'put' : 'post';

      this.http[method](endpoint, this.membershipForm.value).subscribe({
        next: (response) => {
          console.log(
            this.editingMembershipId
              ? 'Membership updated:'
              : 'Membership created:',
            response,
          );
          this.editingMembershipId = null;
          this.membershipForm.reset();
          this.close();
        },
        error: (error) => {
          console.error(this.editingMembershipId ? 'Error updating membership:' : 'Error creating membership:', error);
        }
      });
    }
  }

  close() {
    this.editingMembershipId = null;
    this.membershipForm.reset();
    this.dialog.nativeElement.close();
  }

  private formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
