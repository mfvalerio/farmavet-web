export interface Customer {
  id: string;
  name: string;
  cpf: string;
  telephone: string;
  telephoneForMessages: string;
  cep: string;
  streetName: string;
  number: number;
  neighborhood: string;
  city: string;
  pets: PetInfo[]
}

export interface PetInfo {
  id?: number;
  specie: string;
  name: string;
  birthDate: Date;
  breed: string;
  gender: string;
  customerId: string
  new?: number
}
