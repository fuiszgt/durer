import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: any;

  constructor(public navParams: NavParams, 
    public localNotifications: LocalNotifications) 
  {
    this.session = navParams.data;
  }

  notify(){
        this.localNotifications.schedule({
            title: "Test Title",
            text: "Delayed Notification",
            at: new Date(new Date().getTime() + 5 * 1000), //session.timeStart
            sound: null
        });
  }

}
