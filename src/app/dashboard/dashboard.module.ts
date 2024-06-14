import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponentModule } from './dashboard-routing.module';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    DashboardComponentModule
  ]
})
export class DashboardModule { }
