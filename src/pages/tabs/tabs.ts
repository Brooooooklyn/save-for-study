import { Component } from '@angular/core'

import { AboutPage } from '../about/about'
import { ContactPage } from '../contact/contact'
import { ProjectsComponent } from '../projects/projects.component'

@Component({
  template: require('./tabs.html')
})
export class TabsPage {

  tab1Root = ProjectsComponent
  tab2Root = AboutPage
  tab3Root = ContactPage

}
