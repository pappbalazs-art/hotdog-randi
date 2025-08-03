import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'button.button',
  templateUrl: './button.component.html',
  imports: [CommonModule]
})
export class ButtonComponent {
  @HostBinding("class.button--full-width")
  @Input()
  isFullWidth: boolean = true;

  @HostBinding("disabled")
  @Input()
  isDisabled: boolean = false;

  @Input()
  isLoading: boolean = false;
}
