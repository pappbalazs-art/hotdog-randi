import { CommonModule } from '@angular/common';
import {
  Component,
  HostBinding,
  Input,
  model,
  ModelSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Component for defining our own inputs.
 */
@Component({
  selector: 'div.input',
  templateUrl: 'input.component.html',
  imports: [CommonModule, FormsModule],
})
export class InputComponent {
  @Input({ required: true }) type: 'text' | 'email' | 'password' | 'search' =
    'text';
  @Input({ required: true }) label: string = '';
  @Input({ required: true }) placeholder: string = '';

  @HostBinding('class.input--required')
  @Input()
  isRequired: boolean = false;

  @HostBinding('class.input--full-width')
  @Input()
  isFullWidth: boolean = true;

  public value: ModelSignal<string> = model<string>('');
}
