import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from '../../primitives/icon-button/icon-button.component';
import { ButtonComponent } from '../../primitives/button/button.component';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'SettingsModal',
  standalone: true,
  imports: [
    CommonModule,
    IconButtonComponent,
    ButtonComponent,
  ],
  templateUrl: './settings-modal.component.html',
})
export class SettingsModalComponent {
  @ViewChild('settingsDialog') dialog!: ElementRef<HTMLDialogElement>;
  displayName: string = '';
  email: string = '';

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  open() {
    this.loadUserInfo();
    this.dialog.nativeElement.showModal();
  }

  close() {
    this.dialog.nativeElement.close();
  }

  logout() {
    this.authService.logout();
  }

  otherFunction() {
    window.open('https://github.com/Robzyy/collecta-client', '_blank');
  }

  private loadUserInfo() {
    const decodedToken = this.authService.getDecodedToken();
    if (decodedToken) {
      this.email = decodedToken.sub;
    }

    this.http.get<{ displayName: string }>('/api/v1/users/me/name').subscribe({
      next: (response) => {
        this.displayName = response.displayName;
      },
      error: (error) => {
        console.error('Error fetching user info:', error);
        this.displayName = 'User';
      }
    });
  }
}
