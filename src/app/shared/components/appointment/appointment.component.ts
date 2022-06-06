import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PetInfo } from 'src/app/customers/model/customer';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  appointmentDate: Date | null = null;
  appointmentHour: string | null = null;

  constructor(
    private dialogRef: MatDialogRef<AppointmentComponent>
  ) { }

  ngOnInit(): void {
  }

  close() {
    const time = this.appointmentHour?.split(':');
    if (time) {
      this.appointmentDate?.setHours(Number.parseInt(time[0]), Number.parseInt(time[1]))
    }
    this.dialogRef.close(this.appointmentDate);
  }

}
