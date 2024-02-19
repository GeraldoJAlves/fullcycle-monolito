import ValueObject from "./value-object.interface";

export default class Address implements ValueObject {
  constructor(
    private street: string,
    private number: string,
    private complement: string,
    private city: string,
    private state: string,
    private zipCode: string
  ) {}

  getStreet() {
    return this.street;
  }

  getNumber() {
    return this.number;
  }

  getComplement() {
    return this.complement;
  }

  getCity() {
    return this.city;
  }

  getState() {
    return this.state;
  }

  getZipCode() {
    return this.zipCode;
  }
}
