import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipInCalendarGridComponent } from './membership-in-calendar-grid.component';

describe('MembershipInCalendarGridComponent', () => {
  let component: MembershipInCalendarGridComponent;
  let fixture: ComponentFixture<MembershipInCalendarGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipInCalendarGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MembershipInCalendarGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
