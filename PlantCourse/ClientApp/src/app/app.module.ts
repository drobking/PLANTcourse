import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule,FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ChartsModule, ThemeService } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { AppComponent } from './app.component';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { HomeComponent } from './home/home.component';

import { FetchDataComponent } from './fetch-data/fetch-data.component';
import {DemoNgZorroAntdModule} from './ng-zorro.module';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { TokenInterceptor } from './interceptor';
import { SideBarComponent } from './sideBar/sideBar.component';
import { NotLoginGuard } from './Guards/notLoginGuard';
import { LoggedInGuard } from './Guards/LoggedInGuard';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
const conf: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right'
    },
    vertical: {
      position: 'top'
    }
  }
}
@NgModule({
  declarations: [	
    AppComponent,
 
    HomeComponent,
  
    FetchDataComponent,
      SideBarComponent
   ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    DemoNgZorroAntdModule,
    ChartsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NotifierModule.withConfig(conf),
    RouterModule.forRoot([
      {path:'login',canActivate:[NotLoginGuard],component:HomeComponent,pathMatch:'full'},
      {path:'fetch-data',canActivate:[LoggedInGuard],pathMatch: 'full',component:FetchDataComponent}
    ])
  ],
  providers: [ NgxSpinnerService,
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true},
    {provide:NZ_ICONS,useValue:icons},
    ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
