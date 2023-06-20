import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedin = false;

  constructor(
    private employeeservice: EmployeeService, 
    private toast: NgToastService,
    private router: Router
  ) {}

  login(item: any): void {
    this.employeeservice.login(item).subscribe(
      (data: any) => {
        console.log("Successfully logged in");
        this.isLoggedin = true;

        // Store the login status in session storage or local storage
        if(item.remember) {
            localStorage.setItem('isLoggedIn', 'true')
        } else {
            sessionStorage.setItem('isLoggedIn', 'true');
        }

        this.router.navigate(['/display']);
        this.toast.success({ detail: "Success Message", summary: "Login Successfully", duration: 4000 });
      }, error => {
        this.isLoggedin = false;
        console.log(error);
        console.log("Something went wrong");
        let iconi: any = error.error.message === 'Password Incorrect' ? 'error' : 'warning';
        Swal.fire({
            text: error.error.message,
            icon: iconi,
            confirmButtonText: 'OK',
          });
        this.toast.error({ detail: "Error Message", summary: error.error.message, duration: 4000 });
      }
    );
  }

  isLoggedIn(): boolean {
    // Retrieve the login status from session storage
    let isLoggedIn;

    if(localStorage.getItem('isLoggedIn')) {
        isLoggedIn = localStorage.getItem('isLoggedIn')
    }else {
        isLoggedIn = sessionStorage.getItem('isLoggedIn')
    }

    return isLoggedIn ? JSON.parse(isLoggedIn) : false;
  }
}
