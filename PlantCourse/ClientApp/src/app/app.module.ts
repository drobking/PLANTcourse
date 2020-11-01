import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule,FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ChartsModule, ThemeService } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { AppComponent } from './app.component';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import {DemoNgZorroAntdModule} from './ng-zorro.module';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent,
 
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    DemoNgZorroAntdModule,
    ChartsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
   
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [ NgxSpinnerService,{provide:NZ_ICONS,useValue:icons},ThemeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
