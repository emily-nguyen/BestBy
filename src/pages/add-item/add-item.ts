import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';

@Component({
  templateUrl: 'add-item.html'
})

export class AddItemPage {
  pantryItems: Array<{name: string, date: string}>;
  name: string;
  date: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage) {

    this.storage.get('pantry').then((items) => {
      items ? this.pantryItems = JSON.parse(items) : this.pantryItems = []
    });

    this.name = '';
    this.date = new Date().toISOString();
  }

  saveItem() {
    if (this.name != '') {
      this.pantryItems.push({name: this.name, date: this.date});
      this.storage.set('pantry', JSON.stringify(this.pantryItems));
      this.navCtrl.pop();
    }
  }
}
