export class Employee {
  id: any;
  firstName: string;
  lastName: string;
  mail: string;
  mobile: string;

  constructor(id: string, firstName: string, lastName: string, mail: string, mobile: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.mail = mail;
    this.mobile = mobile;
}
}
