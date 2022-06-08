import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

   }

  ngOnInit(): void {
  }

 // customers: Appointment[] = [];
  //customers$ = new BehaviorSubject<Customer[]>([]);
  //displayedColumns = ['id', 'name', 'cpf', 'telephone', 'telephoneForMessages', 'cep', 'streetName', 'number', 'neighborhood', 'city', 'pet', 'actions'];
  //cpf: string = ''
}
