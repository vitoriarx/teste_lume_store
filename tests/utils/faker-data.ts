import { faker } from '@faker-js/faker';

export interface CheckoutData {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

export class DataFactory {

  static generateCheckoutData(): CheckoutData {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode('#####'),
      phone: faker.phone.number({ style: 'national' })
    };
  }
}