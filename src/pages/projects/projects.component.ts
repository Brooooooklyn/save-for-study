import { Component, ViewChild } from '@angular/core'
import { NavController } from 'ionic-angular'
import { InjectableSDK } from 'sdk'

import { OrgsDropdown } from './orgs-dropdown'

@Component({
  selector: 'projects',
  template: require('./projects.html'),
  entryComponents: [ OrgsDropdown ]
})
export class ProjectsComponent {

  lastWorkspaceId$ = this.sdk
    .getPreference()
    .values()
    .map(([r]: any) => r.lastWorkspace)

  orgs$ = this.sdk
    .getOrganizations()
    .changes()

  @ViewChild(OrgsDropdown) private popover: OrgsDropdown

  constructor(
    public navCtrl: NavController,
    private sdk: InjectableSDK
  ) { }

  selectOrg() {
    this.popover.toggle()
  }

}
