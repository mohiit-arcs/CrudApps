import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Employees } from './Employees';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost:5000/apis/v1/';

//   getEmployees() {
//     // it is returning data
//     return this.http.get<Employees[]>(this.baseUrl + 'view.php');
//   }

    getEmployees(page: number, itemsPerPage: number) {
        // const url = `${this.baseUrl}view.php?page=${page}&itemsPerPage=${itemsPerPage}`;
        return this.http.get<Employees[]>(this.baseUrl + 'getEmployee');
    }
  

  getEmployeeInfo(id: any) {
    return this.http.get<Employees[]>(this.baseUrl + 'getEmployeeById/' + id);
  }

  createEmployee(employee: any) {
    console.log("hello")
    return this.http.post(this.baseUrl + 'createEmployee', employee);
  }

  deleteEmployee(id: any) {
    // console.log(id);
    return this.http.delete(this.baseUrl + `deleteEmployee/${id}`);
  }

  updateEmployee(id: any, employee: any) {
    // console.log("Hello I am id:= " + id)
    return this.http.put(this.baseUrl + `updateEmployee/${id}`, employee);
  }

  login(data: any) {
    return this.http.post(this.baseUrl + 'login', data);
  }

  signup(data: any) {
    return this.http.post(this.baseUrl + 'signup', data)
  }
  
}
