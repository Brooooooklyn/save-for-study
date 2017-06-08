import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ProjectsComponent } from './projects.component'
import { OrgsDropdown } from './orgs-dropdown'

@NgModule({
  declarations: [
    ProjectsComponent,
    OrgsDropdown
  ],
  imports: [
    IonicPageModule.forChild(ProjectsComponent)
  ]
})
export class ProjectsModule { }
