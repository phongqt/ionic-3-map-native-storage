import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';

import { Place } from "../models/place";

@Injectable()
export class PlacesService {
  private places: Place[] = [];

  constructor(private storage: Storage) {
  }

  addPlace(place: Place) {
    this.places.push(place);
    this.storage.set('places', this.places).then().catch((err) => {
      this.places.splice(this.places.indexOf(place), 1);
    })
  }

  loadPlaces() {
    return this.places.slice();
  }

  fetchPlaces() {
    return this.storage.get('places').then((data: Place[]) => {
      return this.places = data || [];      
    });
  }

  deletePlace(index: number) {
    this.places.splice(index, 1);
    this.storage.set('places', this.places);
  }
}