import { Routes } from '@angular/router';

import { homeRoutes } from '@features/home/home.routes';
import { authRoutes } from '@features/auth/auth.routes';
import { profileRoutes } from '@features/profile/profile.routes';

export const routes: Routes = [
  {
    path: '',
    children: homeRoutes,
  },
  {
    path: '',
    children: authRoutes,
  },
  {
    path: 'profile',
    children: profileRoutes,
  },
];
