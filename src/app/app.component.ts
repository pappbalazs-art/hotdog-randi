import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@services/auth.service';

import { NavbarComponent } from '@components/navbar/navbar.component';
import { RatingsService } from '@services/ratings.service';

@Component({
  selector: 'div.app__wrapper',
  imports: [RouterOutlet, NgIf, NavbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private authService: AuthService = inject(AuthService);
  private ratingsService: RatingsService = inject(RatingsService);

  public isReady(): boolean {
    return this.authService.isAppReady();
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
