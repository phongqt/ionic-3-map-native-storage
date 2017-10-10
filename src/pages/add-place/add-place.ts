import { Place } from './../../models/place';
import { PlacesService } from './../../services/places';
import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = {
    lat: 40.7624324,
    long: -73.9759827,
  };
  imgeUrl = '';
  locationIsSet = false;

  constructor(private modalCtrl: ModalController,
    private geoLocation: Geolocation,
    private camera: Camera,
    private placesService: PlacesService) { }

  onLocate() {
    this.geoLocation.getCurrentPosition().then((resp) => {
      this.location.lat = resp.coords.latitude;
      this.location.long = resp.coords.longitude;
      this.locationIsSet = true;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, { location: this.location, isSet: this.locationIsSet });
    modal.present();
    modal.onDidDismiss((data) => {
      if (data) {
        this.location = data.location;
        this.locationIsSet = true;
      }
    })
  }

  onTakePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imgeUrl = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  onSubmit(form: NgForm) {
    const fValue = form.value;
    const place = new Place(fValue.title, fValue.description, this.location, '');
    this.placesService.addPlace(place);
    form.reset();
    this.location = {
      lat: 40.7624324,
      long: -73.9759827,
    };
    this.imgeUrl = '';
    this.locationIsSet = false;
  }
}
