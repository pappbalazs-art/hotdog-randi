import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'div.app__wrapper',
  imports: [RouterOutlet, NgIf],
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
