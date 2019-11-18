import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RealEstatePost } from './rlestePost.model';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, map, take, tap, mergeAll, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PlaceLocation } from 'src/app/shared/location.module';
import { OktaAuthService } from '@okta/okta-angular';
import { PostsResponse, RealEstateResponse } from './posts.interface';
import { HousePost } from './housepost.model';

// export interface RealEstateResponse {
//   house_id: number,
//   user_id: string,
//   catalog: string,
//   title: string,
//   price: number,
//   area: number,
//   image_url: string,
//   city: string,
//   district: string,
//   address: string,
//   location: string,
//   bedroom: number,
//   restroom: number,
//   floor: number,
//   certification: string,
//   rating: number,
// }
// export interface PostsResponse {
//   house_id: number,
//   user_id: string,
//   title: string,
//   price: number,
//   image_url: string,
//   catalog: string,
//   address: string
// }


@Injectable({
  providedIn: 'root'
})
export class RealEstateService {
  private dbPath = '/real-estate-posts';

  private _posts = new BehaviorSubject<PostsResponse[]>([]);
  postsRef: AngularFirestoreCollection<RealEstatePost> = null;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    public oktaAuth: OktaAuthService
  ) {
  }


  //Rest API
  get posts() {
    return this._posts.asObservable();
  }
  //Get post by id
  getPost(postId: string, catalog: string) {
    return this.http.get<RealEstateResponse>(`http://localhost:8762/post/${catalog}/${postId}`).pipe(map(resData => {
      return new RealEstatePost(postId, resData.user_id, resData.catalog, resData.title,
        resData.content, resData.price, resData.area, resData.image_url,
        resData.city, resData.district, resData.address, resData.location, resData.bedroom, resData.restroom,
        resData.floor, resData.certification, resData.direction, resData.rating, resData.house_level)
    }));
  }

  

  //

  fetchPosts() {
    return this.http.get<PostsResponse[]>(`http://localhost:8762/post/`).pipe(
      tap(posts => {
        this._posts.next(posts);
      })
    );
  }

  uploadImage(image: File) {
    const uploadData = new FormData();
    uploadData.append('image', image);
    return this.http.post<{ imageUrl: string, imagePath: string }>(
      `https://us-central1-firstapp-14435.cloudfunctions.net/storeImage`,
      uploadData
    )
  }

  addNewPost(
    catalog: string,
    title: string,
    content: string,
    price: number,
    area: number,
    thumbnail: string,
    image_url: string,
    city: string,
    district: string,
    address: string,
    bedroom: number,
    restroom: number,
    floor: number,
    certification: string,
    direction: string,
    rating: number,
    location: string, 
    house_level: string) {

    let generatedId: number;
    let newPost: HousePost;
    let userId;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let options = { headers: headers };
    return from(this.oktaAuth.getUser()).pipe(mergeMap(userClaims => {
      if (!userClaims.sub) {
        throw new Error('No userId found!')
      }
      console.log('Claims: ', userClaims)
      userId = userClaims.sub;
      newPost = new HousePost(userId, catalog, title, content, price, area, thumbnail, image_url, city, district, address,
        location, bedroom, restroom, floor, certification, direction, rating, house_level);
      console.log('new Post:', newPost)
      return this.http.post<any>(`http://localhost:8762/post/house/`, { ...newPost}, options);
    }))
    
    // return this.oktaAuth.getUser().then(userClaims => {
    //   if (!userClaims.sub) {
    //     throw new Error('No userId found!')
    //   }
    //   newPost = new RealEstatePost(userClaims.sub, catalog, title, content, price, area, image_url, city, district, address,
    //     location, bedroom, restroom, floor, certification, direction, rating);
    //     console.log('new post ',newPost);
    //   return this.http.post<any>(`http://localhost:8762/post/`, { ...newPost}, options);
    // })
    // ).then(resData => {
    //   resData.pipe(switchMap(resData => {
    //     generatedId = resData.house_id;
    //     console.log('Data:' ,resData);
    //     return this.posts;
    //   }),
    //   take(1),
    //   tap(places => {
    //     // newPost.id = generatedId;
    //     this._posts.next(places.concat(newPost));
    //   }))})

  }

  updatePost(placeId: string, title: string, description: string) {

  }
}
