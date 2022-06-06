import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Customer, PetInfo } from 'src/app/customers/model/customer';
import { CustomersService } from 'src/app/customers/services/customers.service';
import { AppointmentComponent } from '../appointment/appointment.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-doguinho-dialog',
  templateUrl: './doguinho-dialog.component.html',
  styleUrls: ['./doguinho-dialog.component.scss']
})
export class DoguinhoDialogComponent implements OnInit {

  _pets: PetInfo[] = [];
  pets$: BehaviorSubject<PetInfo[]> = new BehaviorSubject(this._pets);

  displayedColumns = ['specie', 'gender', 'breed', 'name', 'birthDate', 'appointment', 'actions'];

  updated: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private customer: Customer,
    private customerService: CustomersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DoguinhoDialogComponent>
  ) {
    this._pets = this.customer.pets;
    this.pets$.next(this._pets);
  }

  ngOnInit(): void {
  }

  add() {
    this._pets = this._pets.concat({ specie: '', name: '', birthDate: new Date(), breed: '', gender: '', customerId: this.customer.id, new: this._pets.length });
    this.pets$.next(this._pets);
  }

  update(pet: PetInfo, index: number) {
    pet.new = index;
  }

  save(pet: PetInfo) {
    this.updated = true;
    this.customerService.savePet(pet)
      .subscribe({
        next: (response) => {
          this.snackBar.open('Salvo com sucesso!', '', { duration: 2000 });
          pet.id = response.id;
          this.cancel(pet);
        },
        error: (error) => this.onError("Falha ao salvar.")
      })
    this.customerService.savePet(pet)
  }

  cancel(pet: PetInfo) {
    if (pet.id == undefined) {
      this._pets = this._pets.filter(p => {
        if (p.new == undefined) {
          return true;
        }
        return p.new != pet.new;
      })
    }
    pet.new = undefined;
    this.pets$.next(this._pets);
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  makeAppointment(pet: PetInfo) {
    this.dialog.open(AppointmentComponent).afterClosed().subscribe(data => {
      this.customerService.makeAppointment(pet, data)
      .subscribe({
        next: (response) => {
          this.snackBar.open('Agendado com sucesso!', '', { duration: 2000 });
        },
        error: (error) => this.onError("Falha ao agendar.")
      })
    })
  }

  close() {
    this.dialogRef.close(this.updated)
  }
}
