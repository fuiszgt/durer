import { Component } from '@angular/core';


import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public http: Http) {
  	let head = {'Content-Type': 'text/plain'};
    let headers    = new Headers(head);
    let options    = new RequestOptions({headers: headers});
  	this.http.post('http://localhost:3000/', "", options)
  	.subscribe(	res => {
  		console.log("n");
  	});
  }

}
