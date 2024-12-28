import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddHourModalComponent } from './add-hour-modal/add-hour-modal.component';
import { SettingsService } from '../../services/settings.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hours-setting',
  templateUrl: './hours-setting.component.html',
  styleUrls: ['./hours-setting.component.css']
})
export class HoursSettingComponent implements OnInit {

  hourList: any[] = [];
  constructor(
    public dialog: MatDialog,
    private settingService: SettingsService
  ) { }

  ngOnInit(): void {
    this.getHours();
  }

  getHours(){
    this.settingService.getHours().subscribe((res:any) => {
      console.log('get hours: ', res)
      this.hourList = res.data;
    })
  }


  abrirModalNewHour(){
      const dialogRef = this.dialog.open(AddHourModalComponent, {
        width: '600px',
        height: 'auto',
        panelClass: 'custom-dialog'
      })
  
      dialogRef.componentInstance.hour_emit.subscribe((hour_add:any) => {
        console.log('hour_add: ', hour_add)
        this.getHours();
      })
    }

    deleteHour(id:any){
      console.log('index: ', id)
      Swal.fire({
            title: '¿Estás seguro que deseas eliminar la hora?',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.settingService.deleteHour(id).subscribe((res) => {    
                console.log('eliminado: ', res)
                this.getHours();
              })
            } 
          })
    }

}
