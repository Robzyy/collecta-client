import { Component, signal, computed, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayModalComponent } from '../day-modal/day-modal.component';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';
import { IconButtonComponent } from '../primitives/icon-button/icon-button.component';
import { Membership } from '../../interfaces/membership.interface';
import { MEMBERSHIPS } from '../../data/memberships.data';
import { MembershipInCalendarGridComponent } from '../membership-in-calendar-grid/membership-in-calendar-grid.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'Calendar',
  standalone: true,
  imports: [CommonModule, DayModalComponent, SettingsModalComponent, IconButtonComponent],
  templateUrl: './calendar.component.html'
})
export class CalendarComponent {
  constructor(private http: HttpClient) { }

  @ViewChild(DayModalComponent) dayModal!: DayModalComponent;
  @ViewChild(SettingsModalComponent) settingsModal!: SettingsModalComponent;

  isStartOnMonday = signal(true);
  weekDays = computed(() =>
    this.isStartOnMonday()
      ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  );
  shownDate = signal(new Date());
  currentMonth = new Date().getMonth();
  daysInMonth = computed(() => this.generateCalendarDays());
  selectedDate = signal<Date | null>(null);

  // Update the memberships property to use the imported data
  memberships: Membership[] = MEMBERSHIPS;

  previousMonth() {
    this.shownDate.update(date => {
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() - 1);
      return newDate;
    });
  }

  nextMonth() {
    this.shownDate.update(date => {
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() + 1);
      return newDate;
    });
  }

  goToCurrentMonth() {
    this.shownDate.set(new Date());
  }

  handleToggleFirstDay() {
    this.isStartOnMonday.update(value => !value);
  }

  generateCalendarDays(): number[][] {
    const year = this.shownDate().getFullYear();
    const month = this.shownDate().getMonth();
    let firstDay = new Date(year, month, 1).getDay();

    // Adjust first day based on start of week preference
    firstDay = this.isStartOnMonday()
      ? (firstDay === 0 ? 6 : firstDay - 1)  // Monday-based
      : firstDay;                            // Sunday-based

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let days: number[][] = [];
    let week: number[] = new Array(7).fill(0);
    let dayCounter = 1;

    // Fill in the first week with empty days
    for (let i = firstDay; i < 7 && dayCounter <= daysInMonth; i++) {
      week[i] = dayCounter++;
    }
    days.push([...week]);

    // Fill in the rest of the weeks
    week = new Array(7).fill(0);
    let weekDay = 0;
    while (dayCounter <= daysInMonth) {
      week[weekDay] = dayCounter++;
      if (weekDay === 6 || dayCounter > daysInMonth) {
        days.push([...week]);
        week = new Array(7).fill(0);
      }
      weekDay = (weekDay + 1) % 7;
    }

    return days;
  }

  filterMembershipsForDate(date: Date): Membership[] {
    return this.memberships.filter(membership => {
      const membershipDate = new Date(membership.startDate);
      return membershipDate.getDate() === date.getDate() &&
        membershipDate.getMonth() === date.getMonth();
    });
  }

  openDayModal(day: number) {
    if (day === 0) return;

    const selectedDate = new Date(this.shownDate());
    selectedDate.setDate(day);
    this.selectedDate.set(selectedDate);

    let filteredMemberships: Membership[] = [];

    this.http.get<Membership[]>('/api/memberships').subscribe(data => {
      filteredMemberships.push(...data);
    });


    this.dayModal.memberships = filteredMemberships;
    this.dayModal.open();
  }

  openSettingsModal() {
    this.settingsModal.open();
  }
}
