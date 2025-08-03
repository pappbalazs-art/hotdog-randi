import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { HomeIconComponent } from '@components/icons/home-icon.component';
import { HeartIconComponent } from '@components/icons/heart-icon.component';
import { PlusIconComponent } from '@components/icons/plus-icon.component';
import { NotificationsIconComponent } from '@components/icons/notifications-icon.component';
import { ProfileIconComponent } from '@components/icons/profile-icon.component';

@Component({
  selector: 'nav.navbar__wrapper',
  templateUrl: './navbar.component.html',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    HomeIconComponent,
    HeartIconComponent,
    PlusIconComponent,
    NotificationsIconComponent,
    ProfileIconComponent,
  ],
})
export class NavbarComponent {}
