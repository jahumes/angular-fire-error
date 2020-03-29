import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo
} from '@angular/fire/auth-guard';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';

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
    ...canActivate(() => redirectLoggedInTo(['/testing/page']))
  },
  {
    path: 'testing',
    loadChildren: () =>
      import('./testing/testing.module').then(module => module.TestingModule),
    // ...canActivate(() => redirectLoggedInTo(['/landing']))
    ...canActivate(() => redirectUnauthorizedTo(['/auth/login']))
  },
  {
    path: 'landing',
    component: LandingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
