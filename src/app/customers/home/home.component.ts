import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { CustomersService } from '../services/customers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  show = true;

  constructor(
    public dialog: MatDialog,
    private customersService: CustomersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.load();
  }

  public load() {
    this.show = true;
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

                  this.show = false;
                  this.router.navigate(['customers'], { relativeTo: this.route, state: { final: final } });
                }
              },
              error: (error) => onError("Falha no carregamento.")
            })
        },
        error: (error) => onError("Falha no carregamento.")
      })
  }
}
