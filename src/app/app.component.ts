import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'

import { TabsPage } from '../pages/tabs/tabs'
import { InjectableSDK } from '../sdk'
import { DataStoreType } from 'reactivedb/proxy'

@Component({
  templateUrl: 'app.html'
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
    this.load()
  }

  private load() {
    const { sdk } = this
    return require.ensure([], async () => {
      const { Database } = require('reactivedb')
      const Client = require('snapper-consumer')
      const database = new Database(DataStoreType.MEMORY, true, 'teambition-ionic', 1)
      sdk.initReactiveDB(database)
        .subscribe()
      await sdk.socketClient.initClient(new Client())
    })
  }
}
