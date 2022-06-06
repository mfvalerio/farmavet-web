import { CustomersService } from '../services/customers.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute, Route } from '@angular/router';
import { Customer } from '../model/customer';
import { MatDialog } from '@angular/material/dialog';
import { DoguinhoDialogComponent } from 'src/app/shared/components/doguinho-dialog/doguinho-dialog.component';


@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form-update.component.html',
  styleUrls: ['./customer-form-update.component.scss']
})
export class CustomerFormUpdateComponent implements OnInit {

  readonly state = window.history.state ? window.history.state : null

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private service: CustomersService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      cpf: [null],
      telephone: [null],
      telephoneForMessages: [null],
      cep: [null],
      streetName: [null],
      number: [null],
      neighborhood: [null],
      city: [null],
    });
  }

  ngOnInit(): void {
    if (this.state && this.state.customer) {
      this.form = this.formBuilder.group(this.state.customer);
    }
  }

  onSubmit() {
    this.service.insert(this.form.value)
      .subscribe({
        next: () => {
          this.onSucess()
        },
        error: () => {
          this.onError()
        }
      });

  }

  onCancel() {
    this.location.back();
  }

  private onSucess() {
    this.snackBar.open('Salvo com sucesso!', '', { duration: 2000 });
    this.onCancel();

  }

  private onError() {
    this.snackBar.open('Erro ao salvar', '', { duration: 2000 });
  }
}


