import { PlacesService } from './../../services/places';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Place } from '../../models/place';

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  place: Place;
  index: number;

  constructor(private navParams: NavParams,
    private viewCtrl: ViewController,
    private placesService: PlacesService) {
    this.place = navParams.get('place');
    this.index = navParams.get('index');
  }

  onLeave() {
    this.viewCtrl.dismiss();
  }

  onDelete() {
    this.placesService.deletePlace(this.index);
    this.onLeave();
  }
}
