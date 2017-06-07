import { Component } from '@angular/core'
import { ViewController } from 'ionic-angular'

@Component({
  templateUrl: 'orgs-popover.html',

})
export class OrgsPopover {
  constructor(public viewCtrl: ViewController) { }

  close() {
    this.viewCtrl.dismiss()
  }
}
