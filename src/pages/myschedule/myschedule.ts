import { Component, ViewChild } from '@angular/core';

import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, LoadingController } from 'ionic-angular';

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
// import moment from 'moment';

import { ConferenceData } from '../../providers/conference-data';
import {MyData} from '../../providers/my-data';
/*import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';*/
import { SessionDetailPage } from '../session-detail/session-detail';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'my-page-schedule',
  templateUrl: 'myschedule.html'
})
export class MySchedulePage {
    @ViewChild('scheduleList', { read: List }) scheduleList: List;
    constructor(
      public myData: MyData
      ){}
    show(){
      this.myData.load();
    }
}
