import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import {AppRoutingModule} from './appRouterModule';
import { SpinnerComponent } from './spinnerComponent/spinnerComponent';
import { SpinnerService } from './spinnerComponent/spinnerService';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap'

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule],
  declarations: [ AppComponent , SpinnerComponent],
  bootstrap:    [ AppComponent ], 
  providers : [SpinnerService]
})
export class AppModule { }
