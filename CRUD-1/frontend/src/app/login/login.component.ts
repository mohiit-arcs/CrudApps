import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: any;
    
    constructor(
        // private employeeservice: EmployeeService,
        // private router: Router,
        // private toast: NgToastService,
        private authService: AuthService
    ) {}

    ngOnInit() {}

    onSubmit(item: NgForm) {
        console.log(item.value)
        this.authService.login(item.value);
    }
}
