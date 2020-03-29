import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  form = this._fb.group({
    name: [null, Validators.required]
  });

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
