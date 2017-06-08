import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { DataStoreType, Database } from 'reactivedb'
import * as Client from 'snapper-consumer'

import { TabsPage } from '../pages/tabs/tabs'
import { InjectableSDK } from '../sdk'

@Component({
  template: require('./app.html')
})
export class MyApp {
  rootPage: any = TabsPage

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private sdk: InjectableSDK
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault()
      splashScreen.hide()
    })
  }

  ngOnInit() {
    const { sdk } = this
    const database = new Database(DataStoreType.MEMORY, true, 'teambition-ionic', 1)
    sdk.initReactiveDB(database)
      .subscribe()
    sdk.socketClient.initClient(new Client())
  }
}
