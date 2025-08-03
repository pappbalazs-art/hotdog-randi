import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AuthService } from '@services/auth.service';

import { InputComponent } from '@components/input/input.component';
import { ButtonComponent } from '@components/button/button.component';

@Component({
  selector: 'section.section.section--sign-in-page',
  templateUrl: './sign-in.component.html',
  imports: [InputComponent, ButtonComponent],
})
export class SignInComponent {
  private authService: AuthService = inject(AuthService);

  public email: string = '';
  public password: string = '';

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
    return Boolean(this.email && this.password);
  }

  /**
   * Handle the sign in form's submit action.
   *
   * @param $event The submit event itself. We only need it to prevent the
   * form's default event.
   */
  public async signIn($event: SubmitEvent): Promise<void> {
    $event.preventDefault();

    // Do not call it again if there's a running call.
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);

    try {
      await this.authService.signInWithEmailAndPassword(
        this.email,
        this.password,
      );
    } catch (e) {
      this.isLoading.set(false);
      this.password = '';
      console.error(e);
    }
  }
}
