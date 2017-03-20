import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WebService {
  constructor(public http: Http) {
  }

  getSales() {
    let sales = this.http.get('http://localhost:8080/sales');

    return sales;
  }
}
