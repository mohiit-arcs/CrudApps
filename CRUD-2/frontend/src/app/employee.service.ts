import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employees } from './Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost/apis/';

//   getEmployees() {
//     // it is returning data
//     return this.http.get<Employees[]>(this.baseUrl + 'view.php');
//   }

    getEmployees(page: number, itemsPerPage: number) {
        // const url = `${this.baseUrl}view.php?page=${page}&itemsPerPage=${itemsPerPage}`;
        return this.http.get<Employees[]>(this.baseUrl + 'view.php');
    }
  

  getEmployeeInfo(id: any) {
    // console.log(id)
    return this.http.get<Employees[]>(this.baseUrl + 'view.php?id=' + id);
  }

  createEmployee(employee: any) {
    return this.http.post(this.baseUrl + 'insert.php', employee);
  }

  deleteEmployee(id: any) {
    // console.log(id);
    return this.http.delete(this.baseUrl + `delete.php?id=` + id);
  }

  updateEmployee(id: any, employee: any) {
    // console.log("Hello I am id:= " + id)
    return this.http.put(this.baseUrl + `update.php/${id}`, employee);
  }
  
}
