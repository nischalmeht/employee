import { HttpClient,HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {
  private apiUrl = 'http://localhost:3000/employees'; 

  constructor(private http:HttpClient) {}
  getTotalEmployees(): Observable<number> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((employees) => employees.length) // Get total count
    );
  }
  getEmployees(page: number, limit: number): Observable<{ data: any[]; totalCount: number }> {
    let params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString());

    return this.http.get<any[]>(this.apiUrl, { params, observe: 'response' }).pipe(
      map((response) => {
        const totalCount = Number(response.headers.get('X-Total-Count')) || 10;
        return {
          data: response.body || [],
          totalCount: totalCount
        };
      })
    );
  }
  searchEmployees(firstName: string, jobTitle: string, department: string): Observable<any> {
    let apiUrl = `http://localhost:3000/employees?`;
    const params = [];
    
    if (firstName) params.push(`firstName=${firstName}`);
    if (jobTitle) params.push(`jobTitle=${jobTitle}`);
    if (department) params.push(`department=${department}`);
    
    apiUrl += params.join('&');
    return this.http.get<any>(apiUrl).pipe(
      map(response => response.filter((employee: { firstName: string; jobTitle: string; department: string; }) => {
        const matchesFirstName = firstName ? employee.firstName.toLowerCase().includes(firstName.toLowerCase()) : true;
        const matchesJobTitle = jobTitle ? employee.jobTitle.toLowerCase().includes(jobTitle.toLowerCase()) : true;
        const matchesDepartment = department ? employee.department.toLowerCase().includes(department.toLowerCase()) : true;
        return matchesFirstName && matchesJobTitle && matchesDepartment;
      }))
    );
  }
  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  updateEmployee(id: number, updateData: any): Observable<any> {
    console.log(updateData)
    return this.http.patch(`${this.apiUrl}/${id}`, updateData);
  }
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getEmployeesByRange(start: number, end: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?_start=${start}&_end=${end}`);
  }
  getLatestEmployeeId(): Observable<number> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(employees => {
        if (employees.length === 0) return 1; 
        const maxId = Math.max(...employees.map(emp => Number(emp.id))); 
        return maxId + 1; 
      })
    );
  }
  saveEmployee(employee: any): Observable<any> {
    return this.getLatestEmployeeId().pipe(
      map(newId => {
        employee.id = newId.toString(); // Convert ID to string format
        return employee;
      }),
      switchMap(emp => this.http.post<any>(this.apiUrl, emp))
    );
  }

}
