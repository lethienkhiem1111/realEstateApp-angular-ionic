import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, OnDestroy, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { reject } from 'q';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('map', {static: true}) mapElementRef: ElementRef;
  @Input() center = { lat: 10.029963, lng: 105.770618 };
  @Input() selectable = true;
  @Input() title = 'Pick Location';
  @Input() closeButtonText = 'Cancel';

  clickListener : any;
  googleMaps: any;


  constructor(private modalCrtl: ModalController, private render: Renderer2, 
    private platform: Platform) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.getGoogleMaps()
    .then(googleMaps => {
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement;
      const map = new googleMaps.Map(mapEl, {
        center: this.center,
        zoom: 16
      });

      this.googleMaps.event.addListenerOnce(map, 'idle', () => {
        this.render.addClass(mapEl, 'visible');
      });
      if(this.selectable) {
        this.clickListener = map.addListener('click', event => {
          const selectedCoords = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          };
          this.modalCrtl.dismiss(selectedCoords);
        })
      } else {
        const marker = new googleMaps.Marker({
          position: this.center,
          map: map,
          title: 'Picked Location'
        });
        marker.setMap(map);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  onCancel() {
    this.modalCrtl.dismiss();
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resovle, reject) => {
      const script = document.createElement('script');
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAJOgLHhN-gk30wHRPEcN9GEXDdZOBPERM&callback=initMap"
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadGoogleModule = win.google;
        if(loadGoogleModule && loadGoogleModule.maps) {
          resovle(loadGoogleModule.maps);
        } else {
          reject('Google map not available');
        }
      }
    })
  }

  ngOnDestroy() {
    this.googleMaps.event.removeListener(this.clickListener);
  }
}
