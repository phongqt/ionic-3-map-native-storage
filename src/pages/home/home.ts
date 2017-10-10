import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { Place } from '../../models/place';
import { PlacesService } from '../../services/places';
import { PlacePage } from '../place/place';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  places: Place[] = [];
  addPlacePage = AddPlacePage;

  constructor(public modalCtrl: ModalController, private placesService: PlacesService) {
  }

  ngOnInit() {
    this.placesService.fetchPlaces().then((data: Place[]) => {
      this.places = data;
    });
  }

  ionViewWillEnter() {
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, { place: place, index: index });
    modal.present();
    modal.onDidDismiss(() => {
      this.places = this.placesService.loadPlaces();
    })
  }
}
