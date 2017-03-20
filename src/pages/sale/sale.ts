import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {WebService} from '../../providers/web-service';

@Component({
  selector: 'page-sale',
  templateUrl: 'sale.html',
  providers: [WebService]
})

export class SalePage {
  saleItems: Array<{name: string, price: string}>;

  constructor(public storage: Storage, public service: WebService) {
    this.storage.get('sale').then((items) => {
      items ? this.saleItems = JSON.parse(items) : this.saleItems = []
    });
  }

  ionViewWillEnter() {
    if (this.saleItems == null) {
      this.storage.get('sale').then((items) => {
        items ? this.saleItems = JSON.parse(items) : this.saleItems = []
      });
    } else {
      if (this.saleItems.length == 0) {
        this.getSales();
      }
    }

    console.log('sale items');
    console.log(this.saleItems);
  }

  getSales() {
    this.service.getSales().subscribe(
      data => {
        this.saleItems = data.json()['products'];
        this.storage.set('sale', JSON.stringify(this.saleItems));
      },
      err => console.log(err),
      () => console.log('getSales completed')
    );
  }
}
