import { Customer, PetInfo } from 'src/app/customers/model/customer';

export interface Consultation {
    id: string;
    customer: Customer;
    dateTime: Date;
    pet: PetInfo;
    description: string;
}

