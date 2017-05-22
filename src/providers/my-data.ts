import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class MyData {
  data: any;

  constructor(public storage: Storage) { }

  load(): any {
    this.storage.set('x', 20);
    this.storage.get('x').then((val) => {
    console.log('The value is', val);
  });
  }

  write(){}
}
