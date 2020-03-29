import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoggingInComponent } from './pages/logging-in/logging-in.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { EmailConfirmationDialogComponent } from './components/email-confirmation-dialog/email-confirmation-dialog.component';
import { AuthWrapperComponent } from './components/auth-wrapper/auth-wrapper.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    LoginComponent,
    LoggingInComponent,
    AuthWrapperComponent,
    EmailConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatProgressBarModule,
    MatDialogModule
  ]
})
export class AuthModule {}
