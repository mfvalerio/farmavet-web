import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Consultation } from '../model/consultation';
import { MatDialog } from '@angular/material/dialog';
import { CustomersService } from '../services/customers.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { PetInfo } from 'src/app/customers/model/customer';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss']
})
export class ConsultationsComponent implements OnInit {

  readonly state = window.history.state ? window.history.state : null;

  consultations: Consultation[] = [];
  consultations$ = new BehaviorSubject<Consultation[]>([]);
  displayedColumns = ['id','name', 'cpf', 'dateTime', 'pet'];
  cpf: string = '';

  constructor(
    public dialog: MatDialog,
    private customersService: CustomersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
        if (this.state && this.state.final) {
      this.consultations = this.state.final;
      this.consultations$.next(this.state.final);
    } else {
      this.load();
    }
  }

  public load() {
    const onError = (errorMsg: string) => {
      this.dialog.open(ErrorDialogComponent, {
        data: errorMsg
      });
    }

    this.customersService.findAllConsultations()
      .subscribe({
        next: (consultation) => {
          this.consultations = consultation;
          this.consultations$.next(consultation);
        },
        error: (error) => onError("Falha no carregamento.")
      })

      
    this.customersService.findAllConsultations()
    .subscribe({
      next: (consultation) => {
        const final = consultation.sort((a: any, b: any) => a.name - b.name);
        this.consultations = final;
        this.consultations$.next(final);
      },
      error: (error) => onError("Falha no carregamento.")
    })
  }
  
  search() {
    const final = this.consultations.filter(c => c.customer.cpf.includes(this.cpf || ''));
    this.consultations$.next(final);
  }
  
  onCustomers() {
    this.router.navigate(['', 'customers'], { relativeTo: this.route });
  }
}
