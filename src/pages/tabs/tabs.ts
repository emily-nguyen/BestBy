import {Component} from '@angular/core';
import {PantryPage} from '../pantry/pantry';
import {SalePage} from '../sale/sale';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabsPage {
  tab1Root: any = PantryPage;
  tab2Root: any = SalePage;

  constructor() {
  }
}
