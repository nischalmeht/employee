import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

export const routes: Routes = [
    {path:'add',component:AddEmployeeComponent},
    {path:'edit/:id',component:AddEmployeeComponent}
];
