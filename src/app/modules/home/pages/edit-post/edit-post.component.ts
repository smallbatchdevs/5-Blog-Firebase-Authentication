import {Component}              from '@angular/core';
import {ActivatedRoute}                from '@angular/router';
import {combineLatest, Observable, of} from 'rxjs';
import {DatabaseService}               from 'src/app/shared/services/database/database.service';
import {FormBuilder, FormGroup}        from '@angular/forms';
import {filter, map, pluck, switchMap} from 'rxjs/operators';
import {objectExists}                  from '../../../../shared/services/utilites/utilities.service';

@Component({
             selector   : 'app-edit-post',
             templateUrl: './edit-post.component.html',
             styleUrls  : ['./edit-post.component.scss']
           })
export class EditPostComponent {
  form$: Observable<FormGroup> =
    this.router.params.pipe(pluck('uid'),
                             filter(objectExists),
                             switchMap( uid => combineLatest([of(uid), this.database.getPost$(uid)])),
                             map(([uid, post]) => this.formBuilder.group({
                                                                  uid        : post ? post.uid : uid,
                                                                  title      : post ? post.title : '',
                                                                  body       : post ? post.body : '',
                                                                  isPublished: post ? post.isPublished : '',
                                                                  updatedOn  : post ? post.updatedOn : '',
                                                                  createdOn  : post ? post.createdOn : ''
                                                                })));

  constructor(private router: ActivatedRoute,
              private database: DatabaseService,
              private formBuilder: FormBuilder) { }

  onSubmit(blogPostData) {
    console.log('blog post submitted', blogPostData);
    this.database.updatePost(blogPostData);
  }
}
