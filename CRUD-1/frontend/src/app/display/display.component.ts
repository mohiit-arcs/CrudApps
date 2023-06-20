import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service'
import {NgToastService} from 'ng-angular-popup';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit{
    searchTable: any;
    employees: any;
    sortOrderName: string = 'asc';
    sortOrderGender: string = 'asc';
    sortOrderEmail: string = 'asc';
    sortOrderMobile: string = 'asc';
    sortOrderType: string = 'asc';
    sortOrderAddress: string = 'asc';
    sortOrderPincode: string = 'asc';
    sortOrderState: string = 'asc';

    title = 'pagination';
    POSTS: any;
    page: number = 1;
    count: number = 0;
    tableSize: number = 10;
    tableSizes: any = [10, 15, 20];

    constructor( 
        private employeeservice: EmployeeService,
        private toast: NgToastService,
        private router: Router
        ) { }

    ngOnInit(): void {
        this.postList();
    }

    postList(): void {
        // fetching data
        this.employeeservice.getEmployees(this.page, this.tableSize).subscribe(
            (data:any) => {
                this.count = data.totalPages;
                this.POSTS = data.data;
                console.log(this.POSTS);
                this.employees = data.data;
                // console.log(this.employees)
            }
        )
    }

    onTableDataChange(event: any) {
        this.page = event;
        // this.postList();
    }

    onTableSizeChange(event: any) {
        this.tableSize = event.target.value;
        this.page = 1;
        // this.postList();
    }

    async deleteEmployee(id: any) {
        const shouldDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this entry',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
          });
        if(!shouldDelete.isConfirmed) return;
        
        console.log(id)
        this.employeeservice.deleteEmployee(id).subscribe(
            (data) => {
                Swal.fire('Deleted Successfully', 'The record has been deleted successfully.', 'success');
                this.toast.error({detail: "Delete Message", summary: "Deleted Successfully", duration: 4000});
                
                // this.employees = this.employees.filter((u:any) => u._id.toString() !== id.toString());

                // finding the index of the deleted employee in the array
                const index = this.employees.findIndex((u: any) => u._id === id);

                // when the index is found, remove the item from the array
                if (index !== -1) {
                    this.employees.splice(index, 1);
                }

                // splice works better than filtering
                // console.log("Hello Deleted")
            },
            error => {
                this.toast.error({detail: "Error Message", summary: "Cannot Delete", duration: 4000});
            }
        )
    }

    sortByName() {
        // this.employees.sort((a:any, b:any) => a.name.localeCompare(b.name))

        if (this.sortOrderName === 'asc') {
            this.employees.sort((a: any, b: any) => a.name.localeCompare(b.name));
            this.sortOrderName = 'desc';
          } else if (this.sortOrderName === 'desc') {
            this.employees.sort((a: any, b: any) => b.name.localeCompare(a.name));
            this.sortOrderName = 'as_it_is';
          } else {
            // reset the array 
            this.employees.sort((a: any, b: any) => {
                const time1 = new Date(a.createdAt).getTime();
                const time2 = new Date(b.createdAt).getTime();
                return time1 - time2;
            });
            this.sortOrderName = 'asc';
        }
    }

    sortByGender() {
        // this.employees.sort((a:any, b:any) => a.name.localeCompare(b.name))

        if (this.sortOrderGender === 'asc') {
            this.employees.sort((a: any, b: any) => a.gender.localeCompare(b.gender));
            this.sortOrderGender = 'desc';
          } else if (this.sortOrderGender === 'desc') {
            this.employees.sort((a: any, b: any) => b.gender.localeCompare(a.gender));
            this.sortOrderGender = 'as_it_is';
          } else {
            // reset the array 
            this.employees.sort((a: any, b: any) => {
                const time1 = new Date(a.createdAt).getTime();
                const time2 = new Date(b.createdAt).getTime();
                return time1 - time2;
            });
            this.sortOrderGender = 'asc';
        }
    }

    sortByEmail() {
        // this.employees.sort((a:any, b:any) => a.name.localeCompare(b.name))

        if (this.sortOrderEmail === 'asc') {
            this.employees.sort((a: any, b: any) => a.email.localeCompare(b.email));
            this.sortOrderEmail = 'desc';
          } else if (this.sortOrderEmail === 'desc') {
            this.employees.sort((a: any, b: any) => b.email.localeCompare(a.email));
            this.sortOrderEmail = 'as_it_is';
          } else {
            // reset the array 
            this.employees.sort((a: any, b: any) => {
                const time1 = new Date(a.createdAt).getTime();
                const time2 = new Date(b.createdAt).getTime();
                return time1 - time2;
            });
            this.sortOrderEmail = 'asc';
        }
    }

    sortByNumber() {
        // this.employees.sort((a:any, b:any) => a.name.localeCompare(b.name))

        if (this.sortOrderMobile === 'asc') {
            this.employees.sort((a: any, b: any) => a.mobile - b.mobile);
            this.sortOrderMobile = 'desc';
          } else if (this.sortOrderMobile === 'desc') {
            this.employees.sort((a: any, b: any) => b.mobile -  a.mobile);
            this.sortOrderMobile = 'as_it_is';
          } else {
            // reset the array 
            this.employees.sort((a: any, b: any) => {
                const time1 = new Date(a.createdAt).getTime();
                const time2 = new Date(b.createdAt).getTime();
                return time1 - time2;
            });
            this.sortOrderMobile = 'asc';
        }
    }

    sortByType() {
        // this.employees.sort((a:any, b:any) => a.name.localeCompare(b.name))

        if (this.sortOrderType === 'asc') {
            this.employees.sort((a: any, b: any) => a.employment_type.localeCompare(b.employment_type));
            this.sortOrderType = 'desc';
          } else if (this.sortOrderType === 'desc') {
            this.employees.sort((a: any, b: any) => b.employment_type.localeCompare(a.employment_type));
            this.sortOrderType = 'as_it_is';
          } else {
            // reset the array 
            this.employees.sort((a: any, b: any) => {
                const time1 = new Date(a.createdAt).getTime();
                const time2 = new Date(b.createdAt).getTime();
                return time1 - time2;
            });
            this.sortOrderType = 'asc';
        }
    }

    sortByAddress() {
        // this.employees.sort((a:any, b:any) => a.name.localeCompare(b.name))

        if (this.sortOrderAddress === 'asc') {
            this.employees.sort((a: any, b: any) => a.address.localeCompare(b.address));
            this.sortOrderAddress = 'desc';
          } else if (this.sortOrderAddress === 'desc') {
            this.employees.sort((a: any, b: any) => b.address.localeCompare(a.address));
            this.sortOrderAddress = 'as_it_is';
          } else {
            // reset the array 
            this.employees.sort((a: any, b: any) => {
                const time1 = new Date(a.createdAt).getTime();
                const time2 = new Date(b.createdAt).getTime();
                return time1 - time2;
            });
            this.sortOrderAddress = 'asc';
        }
    }

    sortByState() {
        // this.employees.sort((a:any, b:any) => a.name.localeCompare(b.name))

        if (this.sortOrderState === 'asc') {
            this.employees.sort((a: any, b: any) => a.state.localeCompare(b.state));
            this.sortOrderState = 'desc';
          } else if (this.sortOrderState === 'desc') {
            this.employees.sort((a: any, b: any) => b.state.localeCompare(a.state));
            this.sortOrderState = 'as_it_is';
          } else {
            // reset the array 
            this.employees.sort((a: any, b: any) => {
                const time1 = new Date(a.createdAt).getTime();
                const time2 = new Date(b.createdAt).getTime();
                return time1 - time2;
            });
            this.sortOrderState = 'asc';
        }
    }

    sortByPincode() {
        // this.employees.sort((a:any, b:any) => a.name.localeCompare(b.name))

        if (this.sortOrderPincode === 'asc') {
            this.employees.sort((a: any, b: any) => a.pincode - b.pincode);
            this.sortOrderPincode = 'desc';
          } else if (this.sortOrderPincode === 'desc') {
            this.employees.sort((a: any, b: any) => b.pincode -  a.pincode);
            this.sortOrderPincode = 'as_it_is';
          } else {
            // reset the array 
            this.employees.sort((a: any, b: any) => {
                const time1 = new Date(a.createdAt).getTime();
                const time2 = new Date(b.createdAt).getTime();
                return time1 - time2;
            });
            this.sortOrderPincode = 'asc';
        }
    }

    logout(): void {
        // Check if 'isLoggedIn' key is present in session storage
        if (sessionStorage.getItem('isLoggedIn')) {
          // Remove 'isLoggedIn' key from session storage
          sessionStorage.removeItem('isLoggedIn');
        }
    
        // Check if 'isLoggedIn' key is present in local storage
        if (localStorage.getItem('isLoggedIn')) {
          // Remove 'isLoggedIn' key from local storage
          localStorage.removeItem('isLoggedIn');
        }

        this.toast.warning({detail: "Warning Message", summary: "You have been logout", duration: 4000})
        this.router.navigate(['/login'])        
      }
}
