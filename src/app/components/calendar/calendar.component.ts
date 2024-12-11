import { Component, signal, computed, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayModalComponent } from '../modals/day-modal/day-modal.component';
import { SettingsModalComponent } from '../modals/settings-modal/settings-modal.component';
import { AddMembershipModalComponent } from '../modals/add-membership-modal/add-membership-modal.component';
import { ButtonComponent } from '../primitives/button/button.component';
import { IconButtonComponent } from '../primitives/icon-button/icon-button.component';
import { Membership } from '../../interfaces/membership.interface';
import { HttpClient } from '@angular/common/http';
import { MembershipInCalendarGridComponent } from '../membership-in-calendar-grid/membership-in-calendar-grid.component';
import { SpacerComponent } from '../primitives/spacer/spacer.component';
import { MembershipComponent } from '../membership/membership.component';

@Component({
  selector: 'Calendar',
  standalone: true,
  imports: [
    CommonModule,
    DayModalComponent,
    SettingsModalComponent,
    IconButtonComponent,
    AddMembershipModalComponent,
    ButtonComponent,
    MembershipInCalendarGridComponent,
    SpacerComponent,
  ],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent {
  constructor(private http: HttpClient) {
    this.loadUserInfo();
  }

  weekDays = computed(() => [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]);
  shownDate = signal(new Date());
  currentMonth = new Date().getMonth();
  selectedDate = signal<Date | null>(null);
  memberships: Membership[] = [];
  displayName = signal<string>('');

  ngOnInit() {
    this.loadMembershipsForMonth(this.shownDate());
  }

  generateCalendarDays(): number[][] {
    const year = this.shownDate().getFullYear();
    const month = this.shownDate().getMonth();
    let firstDay = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let days: number[][] = [];
    let week: number[] = new Array(7).fill(0);
    let dayCounter = 1;

    for (let i = firstDay; i < 7 && dayCounter <= daysInMonth; i++) {
      week[i] = dayCounter++;
    }
    days.push([...week]);

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

  openDayModal(day: number) {
    if (day === 0) return;

    const selectedDate = new Date(this.shownDate());
    selectedDate.setDate(day);
    this.selectedDate.set(selectedDate);

    const filteredMemberships = this.filterMembershipsForDate(selectedDate);
    this.dayModal.memberships = filteredMemberships;
    this.dayModal.open();
  }

  openSettingsModal() {
    this.settingsModal.open();
  }

  openAddMembershipModal() {
    this.selectedDate.set(null);
    this.addMembershipModal.open();
  }

  handleAddMembershipClick() {
    this.addMembershipModal.open();
  }

  onMembershipChange() {
    this.loadMembershipsForMonth(this.shownDate());
    if (this.selectedDate()) {
      const selectedDate = this.selectedDate()!;
      const filteredMemberships = this.filterMembershipsForDate(selectedDate);
      this.dayModal.memberships = filteredMemberships;
    }
  }

  @ViewChild('dayModal') dayModal!: DayModalComponent;
  @ViewChild('settingsModal') settingsModal!: SettingsModalComponent;
  @ViewChild('addMembershipModal')
  addMembershipModal!: AddMembershipModalComponent;
  private getFirstDayOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  private getLastDayOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  private getDaysInMonth(date: Date): number {
    return this.getLastDayOfMonth(date).getDate();
  }
  daysInMonth = computed(() => {
    const date = this.shownDate();
    const firstDayOfMonth = this.getFirstDayOfMonth(date);
    const totalDays = this.getDaysInMonth(date);
    const days: number[][] = [];
    let currentWeek: number[] = [];

    let firstDayIndex = firstDayOfMonth.getDay();
    firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    for (let i = 0; i < firstDayIndex; i++) {
      currentWeek.push(0);
    }

    for (let day = 1; day <= totalDays; day++) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        days.push([...currentWeek]);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(0);
      }
      days.push(currentWeek);
    }

    return days;
  });

  previousMonth() {
    this.shownDate.update((currentDate) => {
      const newDate = new Date(currentDate);
      newDate.setMonth(currentDate.getMonth() - 1);
      this.loadMembershipsForMonth(newDate);
      return newDate;
    });
  }

  nextMonth() {
    this.shownDate.update((currentDate) => {
      const newDate = new Date(currentDate);
      newDate.setMonth(currentDate.getMonth() + 1);
      this.loadMembershipsForMonth(newDate);
      return newDate;
    });
  }

  goToCurrentMonth() {
    const currentDate = new Date();
    this.shownDate.set(currentDate);
    this.loadMembershipsForMonth(currentDate);
  }

  loadMembershipsForMonth(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    this.http
      .get<Membership[]>(`/api/v1/memberships?year=${year}&month=${month}`)
      .subscribe({
        next: (data) => {
          this.memberships = data;
        },
        error: (error) => {
          console.error('Error fetching memberships:', error);
          this.memberships = [];
        },
      });
  }

  getDayDate(day: number): Date {
    const date = new Date(this.shownDate());
    date.setDate(day);
    return date;
  }

  filterMembershipsForDate(date: Date): Membership[] {
    return this.memberships.filter((membership) => {
      const startDate = new Date(membership.startDate);
      startDate.setHours(0, 0, 0, 0);
      
      const compareDate = new Date(date);
      compareDate.setHours(0, 0, 0, 0);

      const isAfterStart = compareDate >= startDate;
      if (!isAfterStart) return false;

      const daysSinceStart = Math.floor(
        (compareDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const weeksSinceStart = Math.floor(daysSinceStart / 7);
      const monthsSinceStart =
        (date.getFullYear() - startDate.getFullYear()) * 12 +
        (date.getMonth() - startDate.getMonth());

      switch (membership.recurrencePattern?.frequency) {
        case 'daily':
          return daysSinceStart % membership.recurrencePattern.interval === 0;

        case 'weekly':
          return (
            date.getDay() === startDate.getDay() &&
            weeksSinceStart % membership.recurrencePattern.interval === 0
          );

        case 'monthly':
          return (
            date.getDate() === startDate.getDate() &&
            monthsSinceStart % membership.recurrencePattern.interval === 0
          );

        case 'yearly':
          return (
            date.getDate() === startDate.getDate() &&
            date.getMonth() === startDate.getMonth() &&
            monthsSinceStart % (12 * membership.recurrencePattern.interval) ===
              0
          );

        default:
          return (
            startDate.getDate() === date.getDate() &&
            startDate.getMonth() === date.getMonth() &&
            startDate.getFullYear() === date.getFullYear()
          );
      }
    });
  }

  loadUserInfo() {
    this.http.get<{ displayName: string }>('/api/v1/users/me/name').subscribe({
      next: (response) => {
        this.displayName.set(response.displayName);
      },
      error: (error) => {
        console.error('Error fetching user info:', error);
        this.displayName.set('User');
      },
    });
  }

  membershipsCountForDay(day: number): number {
    if (day === 0) return 0;
    const date = this.getDayDate(day);
    const membershipsForDay = this.filterMembershipsForDate(date);
    return membershipsForDay.length;
  }

  membershipsCountForDayText(day: number): string {
    const count = this.membershipsCountForDay(day);
    return count > 1 ? count + ' Subs' : '1 Sub';
  }
}
