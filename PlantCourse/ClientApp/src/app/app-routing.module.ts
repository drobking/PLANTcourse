import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { LoggedInGuard } from "./Guards/LoggedInGuard";
import { NotLoginGuard } from "./Guards/notLoginGuard";
import { HomeComponent } from "./home/home.component";

const routes:Routes=[
    {path:'',canActivate:[NotLoginGuard],component:HomeComponent,pathMatch:'full'},
    {path:'fetch-data',canActivate:[LoggedInGuard],pathMatch: 'full',component:FetchDataComponent}
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }