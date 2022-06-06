import { CustomersService } from './../services/customers.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';


@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private service: CustomersService,
    private snackBar: MatSnackBar,
    private location: Location) {
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
  }

  onSubmit() {
    this.service.insert(this.form.value)
      .subscribe({
        next: () => this.onSucess(),
        error: () => this.onError()
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


