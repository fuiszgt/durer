import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html'
})
export class ScheduleFilterPage {

  //data: {excludedTrackNames: any[], queryText: string};
  excludedTrackNames: any[];
  queryText: string;
  tracks: Array<{name: string, isChecked: boolean}> = [];


  constructor(
    public confData: ConferenceData,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    // passed in array of track names that should be excluded (unchecked)
    this.excludedTrackNames = this.navParams.data.excluded;
    this.queryText = this.navParams.data.query;

    this.confData.getTracks().subscribe((trackNames: string[]) => {

      trackNames.forEach(trackName => {
        this.tracks.push({
          name: trackName,
          isChecked: (this.excludedTrackNames.indexOf(trackName) === -1)
        });
      });
    });
  }

  resetFilters() {
   // reset all of the toggles to be checked
   this.tracks.forEach(track => {
      track.isChecked = true;
    });
   this.queryText='';
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    this.excludedTrackNames = this.tracks.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss({excluded: this.excludedTrackNames, query: this.queryText});

 //   this.viewCtrl.dismiss(this.data);
  }

  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
}
