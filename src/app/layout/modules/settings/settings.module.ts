import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { MySettingsComponent } from './pages/my-settings/my-settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { HoursSettingComponent } from './pages/hours-setting/hours-setting.component';
import { AddHourModalComponent } from './pages/hours-setting/add-hour-modal/add-hour-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SettingsComponent,
    MySettingsComponent,
    HoursSettingComponent,
    AddHourModalComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
  ]
})
export class SettingsModule { }
