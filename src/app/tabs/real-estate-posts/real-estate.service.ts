import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RealEstatePost } from './rlestePost.model';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
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
  createRealEstatePost(post: RealEstatePost): void{
    this.postsRef.add({...post});
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

  addNewPost(title: string,
    description: string,
    imageUrl: string,
    price: number,
    availableFrom: Date,
    availableTo: Date,
    location: PlaceLocation) {
      
    }
      
    updatePost(placeId: string, title: string, description: string) {
    
    }
}
