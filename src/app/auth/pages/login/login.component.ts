import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = this._fb.group({
    email: [null, [Validators.email, Validators.required]]
  });

  submitted: string = null;
  loading = false;

  constructor(
    private _fb: FormBuilder,
    private _fireAuth: AngularFireAuth,
    private _location: Location
  ) {}

  ngOnInit(): void {
    const email = window.localStorage.getItem('emailForSignIn');
    if (email) {
      this.submitted = email;
    }
    // this._fireAuth.user.subscribe(user => console.log(user));
    // if (this._fireAuth.isSignInWithEmailLink(window.location.href)) {
    //   // Additional state parameters can also be passed via URL.
    //   // This can be used to continue the user's intended action before triggering
    //   // the sign-in operation.
    //   // Get the email if available. This should be available if the user completes
    //   // the flow on the same device where they started it.
    //   let email = window.localStorage.getItem('emailForSignIn');
    //   if (!email) {
    //     // User opened the link on a different device. To prevent session fixation
    //     // attacks, ask the user to provide the associated email again. For example:
    //     email = window.prompt('Please provide your email for confirmation');
    //   }
    //   // The client SDK will parse the code from the link for you.
    //   this._fireAuth
    //     .signInWithEmailLink(email, window.location.href)
    //     .then(function(result) {
    //       // Clear email from storage.
    //       window.localStorage.removeItem('emailForSignIn');
    //       // You can access the new user via result.user
    //       // Additional user info profile not available via:
    //       // result.additionalUserInfo.profile == null
    //       // You can check if the user is new or existing:
    //       // result.additionalUserInfo.isNewUser
    //
    //       console.log(result.user);
    //     })
    //     .catch(function(error) {
    //       // Some error occurred, you can inspect the code: error.code
    //       // Common errors could be invalid email and invalid or expired OTPs.
    //     });
    // }
  }

  submit() {
    if (this.form.valid) {
      window.localStorage.setItem('emailForSignIn', this.form.value.email);
      this.loading = true;
      this.form.disable();
      this._fireAuth
        .sendSignInLinkToEmail(this.form.value.email, {
          // URL you want to redirect back to. The domain (www.example.com) for this
          // URL must be whitelisted in the Firebase Console.
          url:
            window.location.protocol +
            '//' +
            window.location.host +
            '/auth/logging-in',
          // This must be true.
          handleCodeInApp: true
        })
        .then(result => {
          this.loading = false;
          this.submitted = this.form.value.email;
        })
        .catch(err => {
          this.loading = false;
          this.submitted = null;
        });
    }
  }

  retryLogin() {
    this.submitted = null;
    this.form.setValue({
      email: null
    });
    this.form.markAsPristine();
  }
}
