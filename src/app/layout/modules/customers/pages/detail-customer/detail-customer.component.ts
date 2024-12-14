import { Component, OnInit } from '@angular/core';
import { ISubscriptionInterface } from '../../interfaces/ISubscriptionEntity';
import { SubscriptionService } from '../../services/subscription.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { PurchaseService } from '../../services/purchase.service';
import { IPurchaseInterface } from '../../interfaces/IPurchaseEntity';
import { ModalExtendSubscriptionComponent } from './modal-extend-subscription/modal-extend-subscription.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css']
})
export class DetailCustomerComponent implements OnInit {

  idUser: string;
  currentTab: string = 'subscription';
  subscriptionList: ISubscriptionInterface[] = [];
  purchaseList: IPurchaseInterface[] = [];
  constructor(
    private subscriptionService: SubscriptionService,
    private purchaseService: PurchaseService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // this.idUser = this.sharedService.getUserId();
    this.idUser = this.route.snapshot.paramMap.get('id')!; 
    this.getSubscriptions();
    this.getPurchases();
  }

  changeTab(tab: string){
    this.currentTab = tab;
  }

  getSubscriptions(){
    Swal.showLoading();
    this.subscriptionService.getSubscriptionByUser(this.idUser).subscribe((res: any) => {
      console.log('res: ', res)
      Swal.close();
      this.subscriptionList = res.data;
    })
  }


  getPurchases(){
    this.purchaseService.getPurchasesByUser(this.idUser).subscribe((res: any) => {
      console.log('purchases: ', res)
      this.purchaseList = res.data;

    })
  }

  extendSubscription(sub: ISubscriptionInterface){
    const dialogRef = this.dialog.open(ModalExtendSubscriptionComponent, {
      width: '600px',
      height: 'auto',
      data: sub
    })

    dialogRef.componentInstance.extend_emit.subscribe((res:any) => {
      console.log('res: ', res)
      this.getSubscriptions();
    })
  }

}
