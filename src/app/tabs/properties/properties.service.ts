import { Injectable } from '@angular/core';
import { from, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { OktaService } from 'src/app/auth/okta.service';
import { OktaAuthService } from '@okta/okta-angular';
import { mergeMap, tap } from 'rxjs/operators';
import { PostsResponse } from '../real-estate-posts/posts.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  private _posts = new BehaviorSubject<PostsResponse[]>([]);

  constructor(

    private authService: AuthService,
    private http: HttpClient,
    public oktaAuth: OktaAuthService
  ) { }


  get posts() {
    return this._posts.asObservable();
  }

  //Get posts by user id
  fetchPostsByUserId() {
    let userId;
    return from(this.oktaAuth.getUser()).pipe(mergeMap(userClaims => {
      if (!userClaims.sub) {
        throw new Error('No userId found!')
      }
      
      userId = userClaims.sub;
      return this.http.get<PostsResponse[]>(`http://localhost:8762/personal/post/${userId}`).pipe(
      tap(posts => {
        this._posts.next(posts);
      })
    );
    }))
  }
}
