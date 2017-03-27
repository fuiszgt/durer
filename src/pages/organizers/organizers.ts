import { Component, ViewChild } from '@angular/core';

import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, LoadingController } from 'ionic-angular';

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
// import moment from 'moment';

import { ConferenceData } from '../../providers/conference-data';
/*import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';*/
import { SessionDetailPage } from '../session-detail/session-detail';

@Component({
  selector: 'page-organizers',
  templateUrl: 'organizers.html'
})
export class OrganizersPage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('organizerList', { read: List }) organizerList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  orgs: any =[];
  confDate: string;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public confData: ConferenceData,
  ) {}

  ionViewDidLoad() {
    this.app.setTitle('Organizers');
    this.loadOrganizers();
    console.log(this.orgs);
    console.log("LoadO");
  }

  loadOrganizers() {
    this.confData.load().subscribe((data: any) => {
      this.orgs = data.organizers;
    });
    console.log(this.orgs);
    console.log("- by loadOrganizers");
  }

  goToSessionDetail(sessionData: any) {
    // go to the session detail page
    // and pass in the session data
    this.navCtrl.push(SessionDetailPage, sessionData);
  }


  openSocial(network: string, fab: FabContainer) {
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();
  }
}
