import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{

    addForm: any;
    employee_id: any;
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

    constructor( private formBuilder: FormBuilder, 
        private router: Router,
        private employeeservice: EmployeeService,
        private url: ActivatedRoute,
        private toast: NgToastService
        ) {
            this.addForm = this.formBuilder.group({
                _id:[],
                name: ['', Validators.required],
                gender: ['', Validators.required],
                email: ['', Validators.required],
                mobile: ['', Validators.required],
                password: ['', Validators.required],
                employment_type: ['', Validators.required],
                pincode: ['', Validators.required],
                state: ['', Validators.required],
                address: ['', Validators.required]
            })
        }

    ngOnInit(): void {
        this.employee_id = this.url.snapshot.params['id'];

        if(this.employee_id) {
            // console.log(this.employee_id)
            this.employeeservice.getEmployeeInfo(this.employee_id).subscribe(
                (data: any) => {
                    // console.log(data.data);
                    this.addForm.patchValue(data.data);
                }
            )
        }
        // console.log(this.employee_id);
    }

    onEdit() {
        this.submitted = true;
        if(this.addForm.invalid) return;
        // console.log(this.addForm.value);

        this.employeeservice.updateEmployee(this.addForm.value._id, this.addForm.value).subscribe(
            (data: any) => {
                console.log(data);
                this.toast.info({detail: "Update Message", summary: "Updated Successfully", duration: 4000});
                this.router.navigate(['/display']);
            }
            , (error) => {
                console.log("Error Hello")
            }
        );
    }

}
