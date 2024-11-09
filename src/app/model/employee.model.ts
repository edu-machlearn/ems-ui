export class Employee {
    id: number;
  firstName: string;
  lastName: string;
  mail: string;
  mobile: string;

  constructor(id: number, firstName: string, lastName: string, mail: string, mobile: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.mail = mail;
    this.mobile = mobile;
}
}
