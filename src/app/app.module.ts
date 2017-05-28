import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import { SchedulePage } from '../pages/schedule/schedule';
import { MySchedulePage } from '../pages/myschedule/myschedule';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { OrganizersPage } from '../pages/organizers/organizers';
import { ConferenceData } from '../providers/conference-data';
import { MyData } from '../providers/my-data';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { IonicStorageModule } from '@ionic/storage';
import {ScheduleFilterPage} from '../pages/schedule-filter/schedule-filter'

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    SchedulePage,
    SessionDetailPage,
    MySchedulePage,
    OrganizersPage,
    ScheduleFilterPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    SchedulePage,
    MySchedulePage,
    SessionDetailPage,
    OrganizersPage,
    ScheduleFilterPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ConferenceData, LocalNotifications, MyData]
})
export class AppModule {}
