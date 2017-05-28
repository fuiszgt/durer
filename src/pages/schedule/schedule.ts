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
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  /*shownSessions: any = [];
  groups: any = [];*/
  days: any =[];
  confDate: string;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public localNotifications: LocalNotifications
  ) {}

  ionViewDidLoad() {
    this.app.setTitle('Schedule');
    this.updateSchedule();
    console.log(this.days);
    console.log("LoadS")
  }

  notify(){
        this.localNotifications.schedule({
            title: "Test Title",
            text: "Delayed Notification",
            at: new Date(new Date().getTime() + 5 * 1000),
            sound: null
        });
  }

  check(session: any){
    let matchesQueryText = false;
    let queryText = this.queryText.toLowerCase().replace(/,|\.|-/g, ' ');
    let queryWords = queryText.split(' ').filter(w => !!w.trim().length);
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (session.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    let matchesTracks = false;
    session.tracks.forEach((trackName: string) => {
      if (this.excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
    });

    // if the segement is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    //let matchesSegment = true;
  

    // all tests must be true if it should not be hidden
    return !(matchesQueryText && matchesTracks);
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    this.scheduleList && this.scheduleList.closeSlidingItems();
    this.confData.load().subscribe((data: any) => {
      this.days = data.schedule;
    });
    /*this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });*/
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, {
      excluded: this.excludeTracks,
      query: this.queryText
    });
    modal.present();

    modal.onWillDismiss((data: any) => {
      if (data) {
        this.excludeTracks = data.excluded;
        this.queryText = data.query;
        /*this.updateSchedule();*/
      }
    });

  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.excludeTracks=[];
    this.queryText='';
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
