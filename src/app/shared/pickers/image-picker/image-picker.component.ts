import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { Capacitor, Plugins, CameraSource, CameraResultType } from '@capacitor/core';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Platform, ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('filePicker', { static: false}) filePickerRef: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string | File>();
  @Input() showPreview = false;
  selectedImage: SafeResourceUrl;
  photo: SafeResourceUrl;
  usePicker = false;

  constructor(private sanitizer: DomSanitizer, private platform: Platform, private actionSheetCtrl: ActionSheetController) {  }

  // async onPickImage() {
  //   const image = await Plugins.Camera.getPhoto({
  //     quality: 100,
  //     allowEditing: false,
  //     resultType: CameraResultType.DataUrl,
  //     source: CameraSource.Camera
  //   });

  //   this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  // }
  ngOnInit() {
    console.log('Mobile' + this.platform.is('mobile'))
    console.log('Hybird' + this.platform.is('hybrid'))
    console.log('Android' + this.platform.is('android'))
    console.log('Desktop' + this.platform.is('desktop'))
 
    if((this.platform.is('mobile') && !this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.usePicker = true;
      console.log(this.usePicker)
    }
  }

  onPickImage() {
    this.actionSheetCtrl.create({
      header: 'Please Choose',
      buttons: [
        {
          text: 'Open Camera',
          handler: () => {
            this.openCamera();
           }
        },
        {
          text: 'Upload',
          handler: () => {
           this.uploadImage();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        },
      ]
    })
      .then(actionSheetEl => {
        actionSheetEl.present();
      })
    
  }
  uploadImage() {
    if(!Capacitor.isPluginAvailable('Camera') || this.usePicker) {
      this.filePickerRef.nativeElement.click();
      return
    }
  }

  openCamera(){
    Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    })
    .then((image) =>{
      this.selectedImage = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
      this.imagePick.emit(image.base64String);
    })
    .catch(err => {
      console.log(err)
      return false;
    })
  }

  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if(!pickedFile) {
      return
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.imagePick.emit(pickedFile);
    }
    fr.readAsDataURL(pickedFile);
  }


}
