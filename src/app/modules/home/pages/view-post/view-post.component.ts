import {Component}          from '@angular/core';
import {Observable}         from 'rxjs';
import {BlogPost}           from '../../../../shared/models/blog-post';
import {DatabaseService}    from '../../../../shared/services/database/database.service';
import {ActivatedRoute}                from '@angular/router';
import {filter, map, pluck, switchMap} from 'rxjs/operators';
import {objectExists}                  from '../../../../shared/services/utilites/utilities.service';

@Component({
             selector   : 'app-view-post',
             templateUrl: './view-post.component.html',
             styleUrls  : ['./view-post.component.scss']
           })
export class ViewPostComponent {

  post$: Observable<BlogPost> = this.router.params.pipe(pluck('uid'),
                                                        filter(objectExists),
                                                        switchMap(this.db.getPost$));

  constructor(private db: DatabaseService,
              private router: ActivatedRoute) { }

}
