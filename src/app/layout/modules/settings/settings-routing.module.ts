import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { MySettingsComponent } from './pages/my-settings/my-settings.component';
import { HoursSettingComponent } from './pages/hours-setting/hours-setting.component';

const routes: Routes = [
  {
    path: '', 
    component: SettingsComponent,
    children: [
        { path: '', redirectTo: 'my-settings', pathMatch: 'full' },
        { path: 'my-settings'   , component: MySettingsComponent},
        { path: 'hours-settings', component: HoursSettingComponent},
    ]

  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }