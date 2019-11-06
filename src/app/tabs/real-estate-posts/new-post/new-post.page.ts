import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlaceLocation } from 'src/app/shared/location.module';
import { Router, ActivatedRoute, NavigationStart, ParamMap } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RealEstateService } from '../real-estate.service';
import { switchMap, map, filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RealEstatePost } from '../rlestePost.model';


function b64toBlob(dataURI, contentType='', sliceSize=512) {
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;
}

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {
  state$: Observable<object>;
  photo: SafeResourceUrl;
  form: FormGroup;
  cata: any;

  constructor( 
    private realEstateService: RealEstateService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    public activatedRoute: ActivatedRoute
    ) {
      this.route.queryParams.subscribe(params => {
       if(params && params.cata) {
         this.cata = params.cata;
       }
      })
     }

  ngOnInit() {
    
      this.form = new FormGroup({
        title: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        content: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(500)]
        }),
        price: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.min(1)]
        }),
        area: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        city: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        district: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        address: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        certification: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        location: new FormControl(null, {
          validators: [Validators.required]
        }),
        image: new FormControl(null)
  
      });
    

  }


  onLocationPicked(location: PlaceLocation) {
    this.form.patchValue({location: location});
  }

  onImagePicked(imageData: string | File) {
    let imageFile;
    if(typeof imageData === 'string') {
      try {
        imageFile = b64toBlob(imageData.replace('data:image/jpeg;base64', ''), 'image/jpeg');
        console.log('String '+imageFile)
      } catch (error) {
        console.log(error)
        return
      }
    } else {
      imageFile = imageData;
      console.log(imageFile)
    }

    this.form.patchValue({image : imageFile})
  }

  onCreatePost() {
    
    if(!this.form.valid || !this.form.get('image').value) {
      return
    }
    console.log(this.form.value);
    this.loadingCtrl.create({
      message: 'Creating place...'
    }).then(loadingEl => {
      loadingEl.present();
      this.realEstateService.uploadImage(this.form.get('image').value).pipe(
        tap(resImage => {
         
          return this.realEstateService.createRealEstatePost(
            '1', this.cata, this.form.value.title, this.form.value.content, this.form.value.price,
            resImage.imageUrl, this.form.value.city, this.form.value.district, this.form.value.address,
            0, this.form.value.location
          );
        })
      )
      .subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/tabs'])
      });
    })
    
    
  }

  
}
