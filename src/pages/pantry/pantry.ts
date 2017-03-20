import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {NavController} from 'ionic-angular';
import {AddItemPage} from '../add-item/add-item';

@Component({
  templateUrl: 'pantry.html'
})

export class PantryPage {
  pantryItems: Array<{name: string, date: string}>;

  constructor(public navCtrl: NavController, public storage: Storage) {
  }

  ionViewWillEnter() {
    this.storage.get('pantry').then((items) => {
      items ? this.pantryItems = JSON.parse(items) : this.pantryItems = []
    });

    console.log('pantry items');
    console.log(this.pantryItems);
  }

  deleteItem(index: number) {
    this.pantryItems.splice(index, 1);
    this.storage.set('pantry', JSON.stringify(this.pantryItems));
  }

  addItem() {
    this.navCtrl.push(AddItemPage);
  }
}
