import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo
} from '@angular/fire/auth-guard';

const redirectUnauthorized = () => redirectUnauthorizedTo(['/auth/login']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/testing/page'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(module => module.AuthModule),
    ...canActivate(() => redirectLoggedInTo(['/videos/dashboard']))
  },
  {
    path: 'testing',
    loadChildren: () =>
      import('./testing/testing.module').then(module => module.TestingModule),
    ...canActivate(redirectUnauthorized)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
