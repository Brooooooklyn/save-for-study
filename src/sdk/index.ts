import './organization'
import './user'
import { SDK } from 'teambition-sdk'
import { Injectable } from '@angular/core'

@Injectable()
export class InjectableSDK extends SDK { }
