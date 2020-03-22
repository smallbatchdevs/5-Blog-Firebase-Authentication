import {BrowserModule} from '@angular/platform-browser';
import {NgModule}      from '@angular/core';

import {AppRoutingModule}       from './app-routing.module';
import {AppComponent}           from './app.component';
import {HomepageComponent}      from './modules/home/pages/homepage/homepage.component';
import {ViewPostComponent}      from './modules/home/pages/view-post/view-post.component';
import {EditPostComponent}      from './modules/home/pages/edit-post/edit-post.component';
import {ReactiveFormsModule}    from '@angular/forms';
import {AngularFireModule}      from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment}            from '../environments/environment';
import {AngularFireAuthModule}  from '@angular/fire/auth';
import { LoginComponent } from './modules/home/pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ViewPostComponent,
    EditPostComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
