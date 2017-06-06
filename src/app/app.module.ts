import { NgModule, ErrorHandler } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'
import { MyApp } from './app.component'

import { AboutPage } from '../pages/about/about'
import { ContactPage } from '../pages/contact/contact'
import { ProjectsComponent } from '../pages/projects'
import { TabsPage } from '../pages/tabs/tabs'
import { InjectableSDK } from '../sdk'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    ProjectsComponent,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    ProjectsComponent,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InjectableSDK,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
