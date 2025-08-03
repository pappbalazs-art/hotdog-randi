import { Component, inject, signal, WritableSignal } from '@angular/core';

import { InputComponent } from '@components/input/input.component';
import { ButtonComponent } from '@components/button/button.component';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'section.section.section--sign-up-page',
  templateUrl: './sign-up.component.html',
  imports: [InputComponent, ButtonComponent],
})
export class SignUpPageComponent {
  private authService: AuthService = inject(AuthService);

  public firstname: string = '';
  public lastname: string = '';
  public username: string = '';
  public email: string = '';
  public password: string = '';
  public passwordConfirmation: string = '';

  public isLoading: WritableSignal<boolean> = signal<boolean>(false);

  /**
   * Returns whether the form's inputs are valid.
   *
   * TODO: We need to do a better validation process not just if the inputs
   * are empty or not.
   *
   * @return Whether the form's inputs are valid.
   */
  public isFormValid(): boolean {
    return Boolean(
      this.firstname &&
        this.lastname &&
        this.username &&
        this.email &&
        this.password &&
        this.passwordConfirmation,
    );
  }

  /**
   * Handle the sign up form's submit action.
   *
   * @param $event The submit event itself. We only need it to prevent the
   * form's default event.
   */
  public async signUp($event: SubmitEvent): Promise<void> {
    $event.preventDefault();

    // Do not call it again if there's a running call.
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);

    try {
      await this.authService.createUserWithEmailAndPassword(
        this.email,
        this.password,
        this.firstname,
        this.lastname,
        this.username,
      );
    } catch (e) {
      this.isLoading.set(false);
      console.error(e);
    }
  }
}
