import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
    signupForm: any;
    submitted: boolean = false;

    constructor(
        private employeeservice: EmployeeService, 
        private toast: NgToastService,
        private router: Router
    ) {

    }

    ngOnInit(): void {

    }


    onSubmit(item: NgForm) {
        this.submitted = true;
        // console.log(this.addForm.value);
        console.log(item.value);

        this.employeeservice.signup(item.value).subscribe(
            (data: any) => {
            this.toast.success({detail: "Success Message", summary: "SignUp Successfully", duration: 4000});
            this.router.navigate(['/']);
        }, error => {
            // console.log("Something went wrong");
            this.toast.error({detail: "Error Message", summary: error.error.message, duration: 4000});
        }
        )
                
    }
}
