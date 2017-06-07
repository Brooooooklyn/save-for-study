import '../polyfill'
import '../common'

import '../sdk'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/mergeMap'

import 'ionic-angular/css/ionic.min.css'

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app.module'

platformBrowserDynamic().bootstrapModule(AppModule)
