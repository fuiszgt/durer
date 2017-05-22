import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { SchedulePage } from '../schedule/schedule';
import { OrganizersPage } from '../organizers/organizers';
import { SessionDetailPage } from '../session-detail/session-detail';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { MySchedulePage} from '../myschedule/myschedule';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SchedulePage;
  tab2Root: any = OrganizersPage;
  tab3Root: any = MySchedulePage;

  constructor() {

  }
}
