import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { NgIf } from '@angular/common';

import { NavbarComponent } from '@components/navbar/navbar.component';

@Component({
  selector: 'div.app__wrapper',
  imports: [RouterOutlet, NgIf, NavbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private authService: AuthService = inject(AuthService);

  public isReady(): boolean {
    return this.authService.isAppReady();
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
