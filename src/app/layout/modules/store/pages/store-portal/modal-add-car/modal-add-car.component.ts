import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IItemStoreEntity } from '../../../interfaces/IItemStoreEnitity';

@Component({
  selector: 'app-modal-add-car',
  templateUrl: './modal-add-car.component.html',
  styleUrls: ['./modal-add-car.component.css']
})
export class ModalAddCarComponent implements OnInit {

  carList: IItemStoreEntity[] = JSON.parse(localStorage.getItem('car')!)
  totalAmount: number = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public item: any,
  ) { }

  ngOnInit(): void {
    // console.log('carList:', this.carList)
    this.calculateTotalAmount();
    this.addToCar(this.item)
    
  }

  removeToCar(item:IItemStoreEntity, index:number){
    console.log('index:', index)
    const existing = this.carList.find(itemCar => itemCar.name === item.name && itemCar.type == item.type);
    if(existing){
      existing.cantidad!--;
      if(existing.cantidad == 0){
        this.carList.splice(index, 1)
      }
    }

    localStorage.setItem('car', JSON.stringify(this.carList))
    this.totalAmount -= item.amount;
  }

  addToCar(item:IItemStoreEntity){
    console.log('otem: ', item)
    console.log(this.carList)

    const existing = this.carList.find(itemCar => itemCar.name === item.name && itemCar.type == item.type);
    console.log('existing', existing)
    if (existing) {
      existing.cantidad!++;
    } else {
      this.carList.push({ ...item, cantidad: 1 });
    }

    localStorage.setItem('car', JSON.stringify(this.carList))

    console.log('total', this.totalAmount)
    console.log('amount: ', item.amount)
    this.totalAmount += item.amount;
    console.log(this.carList)
  }

  calculateTotalAmount(){
    for(let i=0; i<this.carList.length; i++){
      this.totalAmount += this.carList[i].amount * this.carList[i].cantidad!
    }
  }

  requestPurchase(){
    
  }

  openWhatsApp() {
    const baseUrl = 'https://wa.me/';
    
    let stringProducts = '';
    for (const item of this.carList) {
      stringProducts += `Id: ${item.id};  Producto: ${item.name}; Precio: ${item.amount}; Cantidad: ${item.cantidad}`
    }
    const message = `
      Hola quisiera los siguientes productos: ${stringProducts}
    `;
    const encodedMessage = encodeURIComponent(message); // Codifica el mensaje
    const url = `${baseUrl}51917021657?text=${encodedMessage}`;

    // Abre una nueva pestaña con el enlace
    window.open(url, '_blank');
  }

}
