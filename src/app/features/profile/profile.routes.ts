import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfilePageComponent,
      ),
    title: 'Profile',
  },
];
