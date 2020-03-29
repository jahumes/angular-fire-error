import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {ToastrModule} from 'ngx-toastr';
import {AngularFirestoreModule} from '@angular/fire/firestore';

const config = {
  apiKey: 'AIzaSyAfFdF4-IFkLje0lynFnQmFcB_1za0tl_Q',
  authDomain: 'angular-fire-test-c69b9.firebaseapp.com',
  databaseURL: 'https://angular-fire-test-c69b9.firebaseio.com',
  projectId: 'angular-fire-test-c69b9',
  storageBucket: 'angular-fire-test-c69b9.appspot.com',
  messagingSenderId: '121281834256',
  appId: '1:121281834256:web:404ee5ed03d24c8078c995'
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
