import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { InjectableSDK } from '../../sdk'

@Component({
  selector: 'projects',
  templateUrl: 'projects.html'
})
export class ProjectsComponent {

  constructor(
    public navCtrl: NavController,
    private sdk: InjectableSDK
  ) { }

  ngOnInit() {
    const { sdk } = this
    sdk.getPreference()
      .changes()
      .subscribe(r => {
        console.log(r)
      })
    sdk.getOrganizations()
      .changes()
      .subscribe(r => {
        console.log(r)
      })
  }

}
