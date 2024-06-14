import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,
    children : [{path: 'main', component: MainComponent}, {path: 'profile', component: ProfileComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardComponentModule { }


