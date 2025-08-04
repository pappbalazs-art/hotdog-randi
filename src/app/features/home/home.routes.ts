import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home.component').then((m) => m.HomePageComponent),
    title: 'Hot-Dog Randi',
  },
];
