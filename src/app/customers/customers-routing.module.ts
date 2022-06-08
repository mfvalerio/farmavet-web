import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerFormUpdateComponent } from './customer-form-update/customer-form-update.component';
import { CustomersComponent } from './customers/customers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppointmentComponent } from '../shared/components/appointment/appointment.component';
import { ConsultationsComponent } from './consultations/consultations.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: 'customers', component: CustomersComponent },
    { path: 'new', component: CustomerFormComponent },
    { path: 'update', component: CustomerFormUpdateComponent },
    { path: 'appointments', component: AppointmentComponent },
    { path: 'consultations', component: ConsultationsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {}