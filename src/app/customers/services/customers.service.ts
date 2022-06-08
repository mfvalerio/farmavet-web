import { HttpClient } from '@angular/common/http';
import { Customer, PetInfo } from './../model/customer';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import { Consultation } from '../model/consultation';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private readonly API_CUSTOMERS = 'farmavet/customers';
  private readonly API_PETS = 'farmavet/pets';
  private readonly API_APPOINTMENT = 'farmavet/consultations';


  constructor(private httpClient: HttpClient) { }

  findAllCustomers() {
    console.log(environment.apiUrl + this.API_CUSTOMERS);
    return this.httpClient.get<Customer[]>(environment.apiUrl + this.API_CUSTOMERS)
      .pipe(
        first(),
        delay(1000),
        tap(customer => console.log('Chegou customer', customer))
      );
  }

  findAllConsultations() {
    return this.httpClient.get<Consultation[]>(this.API_APPOINTMENT)
      .pipe(
        first(),
        delay(1000),
        tap(consultation => console.log('Chegou consultation', consultation))
      );
  }

  findAllCustomersPets() {
    return this.httpClient.get<PetInfo[]>(this.API_PETS)
      .pipe(
        first(),
        delay(1000),
        tap(petInfo => console.log('Chegou pet', petInfo))
      );
  }

  savePet(body: PetInfo) {
    const request = Object.assign({}, body);
    delete request.new;
    return this.httpClient.post<PetInfo>(this.API_PETS, request)
      .pipe(
        first(),
        delay(1000),
        tap(petSaved => console.log('Salvou pet', petSaved))
      );
  }

  makeAppointment(petInfo: PetInfo, date: Date) {
    return this.httpClient.post<PetInfo>(this.API_APPOINTMENT, { petId: petInfo.id, customerId: petInfo.customerId, dateTime: date, diagnosis: null, description: 'Consulta agendada', id: null })
      .pipe(
        first(),
        delay(1000),
        tap(petSaved => console.log('Salvou consulta', petSaved))
      );
  }

  insert(record: Customer) {
    return this.httpClient.post<Customer>(this.API_CUSTOMERS, record);
  }
}
