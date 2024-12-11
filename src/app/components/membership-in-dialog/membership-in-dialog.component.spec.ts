import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipInDialogComponent } from './membership-in-dialog.component';

describe('MembershipInDialogComponent', () => {
  let component: MembershipInDialogComponent;
  let fixture: ComponentFixture<MembershipInDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipInDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MembershipInDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
