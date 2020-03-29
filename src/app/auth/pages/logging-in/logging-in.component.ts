import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { EmailConfirmationDialogComponent } from '../../components/email-confirmation-dialog/email-confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logging-in',
  templateUrl: './logging-in.component.html',
  styleUrls: ['./logging-in.component.scss']
})
export class LoggingInComponent implements OnInit {
  constructor(
    private _fireAuth: AngularFireAuth,
    private _modal: MatDialog,
    private _toaster: ToastrService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // this._fireAuth.user.subscribe(user => console.log(user));
    if (this._fireAuth.isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      const email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        const modalRef = this._modal.open(EmailConfirmationDialogComponent, {
          disableClose: true,
          minWidth: '400px'
        });
        modalRef
          .afterClosed()
          .subscribe((newEmail: string) => this._authenticate(newEmail));
      } else {
        this._authenticate(email);
      }
    }
  }

  private _authenticate(email: string) {
    // The client SDK will parse the code from the link for you.
    this._fireAuth
      .signInWithEmailLink(email, window.location.href)
      .then(result => {
        // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn');
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser

        console.log(result.user);
        const toast = this._toaster.success('Redirecting...', 'Login Success', {
          timeOut: 1500
        });

        toast.onHidden
          .pipe(first())
          .subscribe(() => this._router.navigateByUrl('/videos/dashboard'));
      })
      .catch(error => {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
        if (error.code === 'auth/invalid-action-code') {
          const toast = this._toaster.error(
            'This login is no longer valid. Redirecting to main login page...',
            'Login Invalid',
            {
              timeOut: 2500
            }
          );

          toast.onHidden
            .pipe(first())
            .subscribe(() => this._router.navigateByUrl('/auth/login'));
        }
      });
  }
}
