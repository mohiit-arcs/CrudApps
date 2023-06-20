import { Component, OnInit } from '@angular/core';
// import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import {NgToastService} from 'ng-angular-popup';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
    addForm: any;
    submitted: boolean = false;
    states: string[] = [
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chhattisgarh',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal'
      ];

    constructor( 
        // private formBuilder: FormBuilder, 
        private router: Router,
        private employeeservice: EmployeeService,
        private toast: NgToastService
        ) {
            // this.addForm = this.formBuilder.group({
            //     name: ['', Validators.required],
            //     gender: ['', Validators.required],
            //     email: ['', Validators.required],
            //     mobile: ['', Validators.required],
            //     password: ['', Validators.required],
            //     employment_type: ['', Validators.required],
            //     address: ['', Validators.required]
            // })
        }

    ngOnInit(): void {

    }

    onSubmit(item: NgForm) {
        this.submitted = true;
        // console.log(this.addForm.value);
        console.log(item.value);

        this.employeeservice.createEmployee(item.value).subscribe(
            (data: any) => {
                this.toast.success({detail: "Success Message", summary: "Added Successfully", duration: 4000});
                this.router.navigate(['/display']);
            }, error => {
                // console.log("Something went wrong");
                this.toast.error({detail: "Error Message", summary: "Cannot Add Empty", duration: 4000});
            }
        );
    }

}
