import { Component, Input } from '@angular/core'
import { OrganizationSchema } from 'teambition-sdk'
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations'

require('./style')

@Component({
  template: require('./orgs-dropdown.html'),
  animations: [
    trigger('dropDown', [
      state('inactive', style({
        'margin-top': '0px'
      })),
      state('active',   style({
        'margin-top': '100%'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ],
  selector: 'org-dropdown'
})
export class OrgsDropdown {
  @Input('orgs') organizations: OrganizationSchema[]
  @Input('selected') orgId: string

  state = 'inactive'

  private selectedIndex = 0

  ngOnChanges() {
    const { organizations, orgId } = this
    if (!organizations || !orgId) {
      return
    }
    this.selectedIndex = organizations.findIndex(org => org._id === orgId)
  }

  toggle() {
    this.state = this.state === 'active' ? 'inactive' : 'active'
  }

  show() {
    this.state = 'active'
  }

  hide() {
    this.state = 'inactive'
  }
}
