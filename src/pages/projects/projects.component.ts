import 'rxjs/add/operator/startWith'
import { Component } from '@angular/core'
import { NavController, PopoverController } from 'ionic-angular'
import { InjectableSDK } from 'sdk'

import { OrgsPopover } from './orgs-popover.component'

@Component({
  selector: 'projects',
  templateUrl: 'projects.html'
})
export class ProjectsComponent {

  preference$ = this.sdk
    .getPreference()
    .changes()

  orgs$ = this.sdk
    .getOrganizations()
    .changes()
    .startWith([])

  constructor(
    public popoverCtrl: PopoverController,
    public navCtrl: NavController,
    private sdk: InjectableSDK
  ) { }


  selectOrg(ev: Event) {
    const popover = this.popoverCtrl.create(OrgsPopover, {
      organizations: []
    })
    popover.present({
      ev: ev
    })
  }
}
