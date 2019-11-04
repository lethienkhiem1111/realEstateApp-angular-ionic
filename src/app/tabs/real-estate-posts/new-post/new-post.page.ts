import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlaceLocation } from 'src/app/shared/location.module';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RealEstateService } from '../real-estate.service';
import { switchMap } from 'rxjs/operators';


function b64toBlob(b64Data, contentType='', sliceSize=512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {
  photo: SafeResourceUrl;
  form: FormGroup;
  constructor( 
    private realEstateService: RealEstateService,
    private router: Router,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      content: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      area: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      location: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null)

    })
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
       
      )
      .subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/places/tabs/offers'])
      });
    })
    
    
  }

  
}
