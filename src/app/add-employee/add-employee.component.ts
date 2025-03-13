import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeApiService } from '../Employeeeservice/employee-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import e from 'express';

@Component({
  selector: 'app-add-employee',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;
  employeeId;

  constructor(private fb: FormBuilder,private route: ActivatedRoute, private employeeService: EmployeeApiService,private router: Router) {
    this.employeeForm = new FormGroup({
      firstName: new FormControl("",[Validators.required, Validators.minLength(2)]),
      lastName: new FormControl("",[Validators.required, Validators.minLength(2)]),
      email:  new FormControl("",[Validators.required, Validators.email]),
      jobTitle: new FormControl("", Validators.required),
      department:  new FormControl("", Validators.required),
      hireDate:  new FormControl("", Validators.required),
      salary:  new FormControl("",[Validators.required, Validators.min(1)]),
      status: new FormControl("active", Validators.required),
    });
    this.employeeId = Number(this.route.snapshot.paramMap.get('id')); // Get ID from URL
    if(this.employeeId){      
        this.employeeService.getEmployeeById(this.employeeId).subscribe((employee) => {         
          this.employeeForm.patchValue({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            jobTitle: employee.jobTitle,
            department: employee.department,
            hireDate:employee.hireDate,
            salary:employee.salary,
            status:employee.status
          });
        });     
    }
  }
  onSubmit() {
    if(this.employeeId){
      this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value).subscribe(response => {
       alert("Form Updated Succesfully");
       this.router.navigate(['/']);  
      });
    }
    else if (this.employeeForm.valid && !this.employeeId) {
      this.employeeForm.value.id= this.employeeService.getEmployeeById;
      this.employeeService.saveEmployee(this.employeeForm.value).subscribe(response => {
        this.employeeForm.reset();
        alert("Form Submitted")
        this.router.navigate(['/']);  
        // this.fetchEmployees(); // Refresh list after adding
      });
    } else {
      alert('Form is invalid');
    }
  }
  

}
