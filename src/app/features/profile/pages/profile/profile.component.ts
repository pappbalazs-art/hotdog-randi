import { Component, inject, signal, WritableSignal } from '@angular/core';
import { NgIf } from '@angular/common';
import { InitialsPipe } from '@core/pipes/initials.pipe';
import { AuthService } from '@services/auth.service';
import { User } from '@core/types/user.type';

import { ButtonComponent } from '@components/button/button.component';

@Component({
  selector: 'section.section.section--profile-page',
  templateUrl: './profile.component.html',
  imports: [NgIf, InitialsPipe, ButtonComponent],
})
export class ProfilePageComponent {
  private authService: AuthService = inject(AuthService);

  public isSignOutButtonLoading: WritableSignal<boolean> = signal(false);

  /**
   * Get the current user's data.
   */
  public currentUser(): User {
    // We return an empty object as "User" if there are no users for simply
    // clean up the code.
    // There is no chance for that this component is shown and there is no
    // user returned by the User Service.
    return this.authService.getCurrentUser() || ({} as User);
  }

  /**
   * Get the current user's full name.
   */
  public currentUserName(): string {
    const { profile } = this.currentUser();
    const { firstname, lastname } = profile;

    return `${firstname} ${lastname}`;
  }

  /**
   * Handle the sign out button's action.
   */
  public async signOut(): Promise<void> {
    // Do not call if the signing out is in progress.

    if (this.isSignOutButtonLoading()) {
      return;
    }

    this.isSignOutButtonLoading.set(true);

    try {
      await this.authService.signOut();
    } catch (e) {
      this.isSignOutButtonLoading.set(false);
      console.error(e);
    }
  }
}
