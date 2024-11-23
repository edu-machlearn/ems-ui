import { Employee } from './model/employee.model';
import { EmsService } from './service/ems.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { subscribe } from 'diagnostics_channel';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title=null;
  employees: Employee[] = [];
  employee:any;
  showForm:boolean = false;
  action:any;
  btnFlag:any;
  model = {
    id:0,
    firstName: '',
    lastName: '',
    mail: '',
    mobile: ''
  };
  constructor(private emsService: EmsService){}
    ngOnInit(){
    this.emsService.printWelcome().subscribe(
      (data) =>{
       // console.log("data: ",data);
        this.title = data.message;
      }
    );
    //this.getAllEmployee();
  }
  getAllEmployee():void{
    console.log("Call getAllEmployee()");
    this.emsService.getAllEmployee().subscribe(
      (data: Employee[]) =>{
        //console.log(data);
        this.employees = data;
      },
      (error) =>{
        console.log("Error ",error)
      }
    );
  }

  getEmployeeById(id:number){
    console.log("Call getEmployeeById() -",id);
    this.emsService.getEmployeeById(id).subscribe(
      (data:Employee) =>{
        this.employee = data;
      }
    );
  }
  deleteEmp(id:number){
    this.emsService.deleteEmp(id).subscribe(
      (res:any)=>{
        console.log(res);
        alert(res.status);
        this.getAllEmployee();
      }
    );
  }
  toggleDiv(){
    this.showForm = !this.showForm;
    this.btnFlag = "add";
  }
  onSubmit(form: any){
    console.log('Form Data: ', form.value);
    console.log("JSON Data :",this.model);
    this.emsService.saveEmployee(this.model).subscribe(
      (res:any) =>{
        console.log("Response > ",res);
        alert("Data Insert Success!");
        this.model = {
          id:0,
          firstName: '',
          lastName: '',
          mail: '',
          mobile: ''
        }; // Clear the JSON data
        this.getAllEmployee();
      }
    );
  }
  updateEmpData(form: any){
    console.log('Form Data: ', form.value);
    console.log("JSON Data :",this.model);
    this.emsService.editEmployee(this.model).subscribe(
      (res:any) =>{
        console.log("Response > ",res);
        alert("Data Updated Success!");
        this.model = {
          id:0,
          firstName: '',
          lastName: '',
          mail: '',
          mobile: ''
        }; // Clear the JSON data
        this.getAllEmployee();
      }
    );
  }
  editEmp(id:number){
    this.btnFlag = "edit";
    this.emsService.getEmployeeById(id).subscribe(
      (data:Employee) =>{
        //this.employee = data;
        this.model.id = id;
        this.model.firstName = data.firstName;
        this.model.lastName = data.lastName;
        this.model.mail = data.mail;
        this.model.mobile = data.mobile;
      }
    );
  }
}
