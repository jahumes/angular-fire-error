import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-email-confirmation-dialog',
  templateUrl: './email-confirmation-dialog.component.html',
  styleUrls: ['./email-confirmation-dialog.component.scss']
})
export class EmailConfirmationDialogComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  constructor(
    private _dialog: MatDialogRef<EmailConfirmationDialogComponent>
  ) {}

  ngOnInit(): void {}

  confirm() {
    if (this.form.valid) {
      this._dialog.close(this.form.value.email);
    }
  }
}
