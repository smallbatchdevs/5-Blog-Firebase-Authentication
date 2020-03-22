import {Component}       from '@angular/core';
import {BlogPost}        from '../../../../shared/models/blog-post';
import {DatabaseService} from '../../../../shared/services/database/database.service';
import {Router}          from '@angular/router';
import {Observable}      from 'rxjs';
import {AuthService}     from '../../../../shared/services/authentication/auth.service';
import {objectExists}    from '../../../../shared/services/utilites/utilities.service';
import {filter, map}     from 'rxjs/operators';

@Component({
             selector   : 'app-homepage',
             templateUrl: './homepage.component.html',
             styleUrls  : ['./homepage.component.scss']
           })
export class HomepageComponent {

  readonly currentUser$: Observable<string> =
             this.authService.user$.pipe(filter(objectExists),
                                         map(user => user.email));

  readonly blogs$: Observable<BlogPost[]> = this.database.getPosts$();

  constructor(private database: DatabaseService,
              private router: Router,
              private authService: AuthService) { }

  editPost(postUid?: string) {
    if (postUid) {
      this.router.navigate([`/edit/${postUid}`]);
    } else {
      this.router.navigate([`/edit/${this.database.getNewUid()}`]);
    }
  }

  readPost(postUid: string) {
    this.router.navigate([`/post/${postUid}`]);
  }

  logout() {
    this.authService.logout();
  }
}
