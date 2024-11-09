import { Employee } from './model/employee.model';
import { EmsService } from './service/ems.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title=null;
  employees: Employee[] = [];
  constructor(private emsService: EmsService){}
  ngOnInit(){
    this.emsService.printWelcome().subscribe(
      (data) =>{
       // console.log("data: ",data);
        this.title = data.message;
      }
    );
    this.getAllEmployee();
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
}
