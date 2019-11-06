import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RealEstatePost } from './rlestePost.model';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, take, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PlaceLocation } from 'src/app/shared/location.module';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {
  private dbPath = '/real-estate-posts';

  private _posts = new BehaviorSubject<RealEstatePost[]>([]);
  postsRef: AngularFirestoreCollection<RealEstatePost> = null;

  constructor(
    private authService: AuthService, 
    private http: HttpClient,
    private db: AngularFirestore
    ) { 
      this.postsRef = db.collection(this.dbPath);
    }
    
  // Firestore
  createRealEstatePost(realEstateId: string,
    cata: string,
    title: string,
    content: string,
    price: number,
    thumbnailUrl: string,
    city: string,
    district: string,
    address: string,
    rating: number,
    location: PlaceLocation): void{
      let newPost =  { postId: '1',
      realEstateId: '1',
      cata: cata,
      title: title,
      content: content,
      price: price,
      thumbnailUrl: thumbnailUrl,
      city: city,
      district: district,
      address: address,
      rating: rating,
      location: location
}
      this.postsRef.add({...newPost})
       
  }

  updateRealEstePost(key: string, value: any):Promise<void> {
    return this.postsRef.doc(key).update(value);
  }

  deleteRealEstatePost(key: string): Promise<void> {
    return this.postsRef.doc(key).delete();
  }

  getRealEstateList(): AngularFirestoreCollection<RealEstatePost> {
    return this.postsRef;
  }



  //Rest API
  get posts() { 
    return this._posts.asObservable;
  }

  getPost(postId: string) {
    
  }

  fetchPlaces() {

  }

  uploadImage(image: File) {
    const uploadData = new FormData();
    uploadData.append('image', image);
    return this.http.post<{imageUrl: string, imagePath: string}>(
      `https://us-central1-firstapp-14435.cloudfunctions.net/storeImage`,
      uploadData
    )
  }

  addNewPost(
    realEstateId: string,
    cata: string,
    title: string,
    content: string,
    price: number,
    thumbnailUrl: string,
    city: string,
    district: string,
    address: string,
    rating: number,
    location: PlaceLocation) {
    
     
      
    }
      
    updatePost(placeId: string, title: string, description: string) {
    
    }
}
