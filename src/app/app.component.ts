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
  model = {
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
  toggleDiv(){
    this.showForm = !this.showForm;
  }
  onSubmit(form: any){
    console.log('Form Data: ', form.value);
    console.log("JSON Data :",this.model);
    this.emsService.saveEmployee(this.model).subscribe(
      (res:any) =>{
        console.log("Response > ",res);
        alert("Data Insert Success!");
      }
    );
  }
}
