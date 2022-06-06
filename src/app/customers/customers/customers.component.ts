import { Customer } from './../model/customer';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DoguinhoDialogComponent } from 'src/app/shared/components/doguinho-dialog/doguinho-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomersService } from '../services/customers.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  readonly state = window.history.state ? window.history.state : null;

  customers: Customer[] = [];
  customers$ = new BehaviorSubject<Customer[]>([]);
  displayedColumns = ['id', 'name', 'cpf', 'telephone', 'telephoneForMessages', 'cep', 'streetName', 'number', 'neighborhood', 'city', 'pet', 'actions'];
  cpf: string = '';

  constructor(
    public dialog: MatDialog,
    private customersService: CustomersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.state && this.state.final) {
      this.customers = this.state.final;
      this.customers$.next(this.state.final);
    } else {
      this.load();
    }
  }

  onAdd() {
    this.router.navigate(['', 'new'], { relativeTo: this.route });
  }

  onUpdate(customer: Customer) {
    this.router.navigate(['', 'update'], { relativeTo: this.route, state: { customer } });
  }

  openDoguinhoModal(customer: Customer) {
    this.dialog.open(DoguinhoDialogComponent, {
      data: customer
    }).afterClosed().subscribe(update => {
      if (update) {
        this.load();
      }
    })
  }

  public load() {
    const onError = (errorMsg: string) => {
      this.dialog.open(ErrorDialogComponent, {
        data: errorMsg
      });
    }

    this.customersService.findAllCustomersPets()
      .pipe(
        catchError(error => {
          onError("Falha no carregamento.");
          return of([])
        })
      );

    this.customersService.findAllCustomers()
      .subscribe({
        next: (customer) => {
          this.customersService.findAllCustomersPets()
            .subscribe({
              next: (petInfo) => {
                if (petInfo) {
                  customer.forEach(c => c.pets = petInfo.filter(p => p.customerId === c.id));
                  const final = customer.sort((a: any, b: any) => a.name - b.name);
                  this.customers = final;
                  this.customers$.next(final);
                }
              },
              error: (error) => onError("Falha no carregamento.")
            })
        },
        error: (error) => onError("Falha no carregamento.")
      })
  }

  search() {
    const final = this.customers.filter(c => c.cpf.includes(this.cpf || ''));
    this.customers$.next(final);
  }

}
