import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'div.app__wrapper',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {}
