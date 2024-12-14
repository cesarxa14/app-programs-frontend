import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ISubscriptionInterface } from '../../../interfaces/ISubscriptionEntity';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionService } from '../../../services/subscription.service';
import { IExtendSubscription } from '../../../interfaces/IExtendSubscriptionDto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-extend-subscription',
  templateUrl: './modal-extend-subscription.component.html',
  styleUrls: ['./modal-extend-subscription.component.css']
})
export class ModalExtendSubscriptionComponent implements OnInit {

  updateForm: FormGroup;
  minDate: string;
  @Output() extend_emit:any = new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) public sub: ISubscriptionInterface,
    private _formBuilder: FormBuilder,
    private subscriptionService: SubscriptionService,
    public dialogRef: MatDialogRef<ModalExtendSubscriptionComponent>,
  ) { }

  ngOnInit(): void {
    console.log('sub: ', this.sub)
    this.updateForm = this._builderForm();
  }

  _builderForm() {
    // const pattern = '[a-zA-Z ]{2,254}';
    const form = this._formBuilder.group({
      endDate: ['', [Validators.required]],
    });

    form.get('endDate')!.patchValue(this.formatDate(this.sub.endDate));
    this.minDate = this.formatDate(this.sub.endDate)
    return form;
  }

  get endDate() {return this.updateForm.controls["endDate"]}

  private formatDate(date:any ) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  extendSubscription(){
    Swal.showLoading();
    const payload: IExtendSubscription = {
      endDate: this.endDate.value
    }
    console.log('payload: ', payload)
    this.subscriptionService.extendSubscription(this.sub.id, payload).subscribe((res: any) => {
      Swal.close();
      Swal.fire({
        title: 'Se amplió la subscripción!',
        // text: 'Se inició sesión',
        icon: 'success',
        confirmButtonText: 'Ir',
        allowOutsideClick: false
      }).then((result) => {
        console.log('result: ', result)
        if(result.isConfirmed){
          this.extend_emit.emit();
          this.dialogRef.close()
          
        }
      })
      console.log('res: ', res)
    })
  }

}
