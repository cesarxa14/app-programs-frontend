import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ICreateHourDto } from '../interfaces/ICreateHourDto';
import { SettingsService } from '../../../services/settings.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-hour-modal',
  templateUrl: './add-hour-modal.component.html',
  styleUrls: ['./add-hour-modal.component.css']
})
export class AddHourModalComponent implements OnInit {

  addHourForm: FormGroup;
  @Output() hour_emit: any = new EventEmitter();
  constructor(
    private _formBuilder: FormBuilder,
    private settingsService: SettingsService,
    public dialogRef: MatDialogRef<AddHourModalComponent>,
  ) { }

  ngOnInit(): void {
    this.addHourForm = this._builderForm();
  }

   _builderForm() {
  
      const form = this._formBuilder.group({
        startHour: [null, [Validators.required, this.timeValidator()]],
        endHour: [null, [Validators.required, this.timeValidator()]],
       
      });
  
      return form;
  }

  get startHour() { return this.addHourForm.controls["startHour"] }
  get endHour() { return this.addHourForm.controls["endHour"] }

  timeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      // Verificar el formato HH:mm usando una expresión regular
      const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(value)) {
        return { invalidTimeFormat: 'El formato debe ser HH:mm (por ejemplo, 03:30 o 23:15).' };
      }
  
      // Validar la lógica de hora y minutos
      const [hours, minutes] = value.split(':').map(Number);
      if (hours > 23 || minutes > 59) {
        return { invalidTimeRange: 'La hora debe estar en el rango 00:00 - 23:59.' };
      }
  
      return null; // Es válido
    };
  }

  createHour(){
    Swal.showLoading()
    const payload: ICreateHourDto = {
      endHour: this.endHour.value,
      startHour: this.startHour.value
    }

    console.log('payload: ', payload)

    this.settingsService.createHour(payload).subscribe((res: any) => {
      console.log('res created hour: ', res)
      Swal.close()
      Swal.fire({
              title: 'Se creó la hora!',
              // text: 'Se inició sesión',
              icon: 'success',
              confirmButtonText: 'Ir',
              allowOutsideClick: false
            }).then((result) => {
              console.log('result: ', result)
              if (result.isConfirmed) {
                this.hour_emit.emit(res);
                this.dialogRef.close()
      
              }
        })
    })



  }

}
