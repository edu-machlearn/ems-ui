import { Employee } from './../model/employee.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmsService {
  private baseUrl = "http://localhost:2025/ems/";
  constructor(private http: HttpClient) { }

  printWelcome(): Observable<any>{
    return this.http.get<any>(this.baseUrl);
  }

  getAllEmployee(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.baseUrl+"emp/empAll");
  }

  getEmployeeById(id:number):Observable<Employee>{
    return this.http.get<Employee>(this.baseUrl+`emp/empById/${id}`);
  }

  saveEmployee(emp:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+"emp/save",emp);
  }
  editEmployee(emp:any):Observable<any>{
    return this.http.put<any>(this.baseUrl+"emp/updateEmp",emp);
  }

  deleteEmp(id:number):any{
    return this.http.delete<any>(this.baseUrl+`emp/deleteById/${id}`);
  }
}
