import { Component ,OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { EmployeeApiService } from '../Employeeeservice/employee-api.service';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-dashboard',
  imports: [MatSlideToggleModule,MatTableModule,MatCardModule,MatIconModule,MatButtonModule,MatInputModule,MatPaginatorModule
    ,MatSortModule,MatToolbarModule,ReactiveFormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  // providers:[EmployeeApiService]
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'jobTitle','department',"salary","hireDate","isActive","actions"];
  employees: any[]=[];
  errorMessage="";
  totalItems = 100;
  pageSize = 10;
  currentPage = 0;
  searchText: string = '';
  dataSource: any;
  posts: any[] = [];
  totalPosts: number = 0;
  page: number = 1;
  limit: number = 5;
  firstNameControl = new FormControl('');
  jobTitleControl = new FormControl('');
  departmentControl = new FormControl('');
  firstName: string = '';
  jobTitle: string = '';
  department: string = '';
  loading: boolean=false;
  searchForm: FormGroup;
  private firstNameSubject: Subject<string> = new Subject();
  private jobTitleSubject: Subject<string> = new Subject();
  private departmentSubject: Subject<string> = new Subject();
  start = 0;
  departmentMap: { [key: number]: string } = {
      1: 'IT',
      2: 'HR',
      3: 'Finance',
      4: 'Marketing'
    };
  isNextDisabled: boolean=false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeApiService,
   ) { 
    
   }
   ngOnInit(): void {
    
    this.fetchEmployeeData(); 
    this.firstNameSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((firstName) => this.employeeService.searchEmployees(firstName, this.jobTitle, this.department))
    ).subscribe((result) => {
      this.dataSource = result;
    });
    this.jobTitleControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => {
        this.loading = true;
        return this.employeeService.searchEmployees(
          this.firstNameControl.value || '',
          this.jobTitleControl.value || '',
          this.departmentControl.value || ''
        );
      })
    ).subscribe(
      (employees) => {
        this.dataSource = employees;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.error(error);
      }
    );
    this.departmentControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => {
        this.loading = true;
        return this.employeeService.searchEmployees(
          this.firstNameControl.value || '',
          this.jobTitleControl.value || '',
          this.departmentControl.value || ''
        );
      })
    ).subscribe(
      (employees) => {
        this.dataSource = employees;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.error(error);
      }
    );
    this.getTotalData()  
   }
   getTotalData(){
    this.employeeService.getTotalEmployees().subscribe(data=>{
      
    })
   }
   fetchEmployeeData(){
    this.employeeService.getEmployees(this.page, this.limit).subscribe((response) => {
      this.dataSource = response.data;
      this.employees=response.data
      this.totalPosts = response.totalCount;
    });
   }
   editEmployee(employee: any) {
    this.router.navigate(['/edit', employee]);
  }

  deleteEmployeeData(employee: any) {
    this.employeeService.deleteEmployee(employee).subscribe((response)=>{
      alert("Delete data successfully")
      this.fetchEmployeeData()
    })
  }
  onSearchFirstName(firstName: any): void {
    let value=this.firstNameControl.value ||''
    this.firstNameSubject.next(value);
  }

  loadEmployees() {
    this.employeeService.getEmployeesByRange(this.start, this.start + this.limit)
      .subscribe(data => {
        this.dataSource = data;
        this.employees=data;
        this.isNextDisabled = data.length < this.limit;
      });
  }
  nextPage() {
    if (!this.isNextDisabled) {
      this.start += this.limit;
      this.loadEmployees();
    }
  }

  prevPage() {
    if (this.start > 0) {
      this.start -= this.limit;
      this.loadEmployees();
    }
  }
  
}
