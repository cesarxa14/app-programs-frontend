import { Component, OnInit } from '@angular/core';
import { AssistService } from '../../services/assist.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-historial-assist',
  templateUrl: './historial-assist.component.html',
  styleUrls: ['./historial-assist.component.css']
})
export class HistorialAssistComponent implements OnInit {

  roleId: any;
  idUser: any;
  historialAssist: any[] = [];
  constructor(
    private assistService: AssistService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.roleId = this.sharedService.getRoleId();
    this.idUser = this.sharedService.getUserId();
    if(this.roleId == 1){
      this.getAssisyByAdmin()
    } else if(this.roleId == 3){
      this.getAssisyByCustomer()
    }
  }


  getAssisyByAdmin(){
    this.assistService.getAssistByAdmin(this.idUser).subscribe((res: any) => {
      console.log('res: ', res)
      this.historialAssist = res.data;
    })
  }

  getAssisyByCustomer(){
    this.assistService.getAssistByCustomer(this.idUser).subscribe((res: any) => {
      console.log('res: ', res)
      this.historialAssist = res.data;
    })
  }

}
