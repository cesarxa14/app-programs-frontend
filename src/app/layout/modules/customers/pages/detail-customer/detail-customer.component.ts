import { Component, OnInit } from '@angular/core';
import { ISubscriptionInterface } from '../../interfaces/ISubscriptionEntity';
import { SubscriptionService } from '../../services/subscription.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { PurchaseService } from '../../services/purchase.service';
import { IPurchaseInterface } from '../../interfaces/IPurchaseEntity';

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
    private route: ActivatedRoute
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
    this.subscriptionService.getSubscriptionByUser(this.idUser).subscribe((res: any) => {
      console.log('res: ', res)
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

  }

}
