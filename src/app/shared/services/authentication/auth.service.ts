import {Injectable, NgZone} from '@angular/core';
import {Observable}         from 'rxjs';
import {AngularFireAuth}    from '@angular/fire/auth';
import {Router}             from '@angular/router';
import {shareReplay}        from 'rxjs/operators';
import {auth}               from 'firebase/app';

@Injectable({
              providedIn: 'root'
            })
export class AuthService {

  public user$: Observable<firebase.User> = this.afAuth.user.pipe(shareReplay(1));
  private smallBatchDevsEmail = 'smallbatchdevs@gmail.com';

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private ngZone: NgZone) { }

  signInWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
               .then(() => {
                 return this.ngZone.run(() => this.router.navigate(['/']));
               }).catch(err => {
        console.log('AuthService::Failed Login', err);
      });
  }

  isSmallBatchDevsLoggedIn() {
    // only allow our admin email
    return this.afAuth.auth.currentUser &&
           this.afAuth.auth.currentUser.email === this.smallBatchDevsEmail;
  }

  logout() {
    this.afAuth.auth.signOut().then(this.router.navigate['/']);
  }
}
