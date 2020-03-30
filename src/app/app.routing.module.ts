import {EmployeeDetailsComponent} from './components/employee/details/employee-details.component';
import {CreateEmployeeComponent} from './components/employee/create/create-employee.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EmployeeListComponent} from './components/employee/list/employee-list.component';
import {UpdateEmployeeComponent} from './components/employee/update/update-employee.component';
import {DepartmentCreateComponent} from './components/department/create/department-create.component';
import {DepartmentListComponent} from './components/department/list/department-list.component';
import {DepartmentDetailsComponent} from './components/department/details/department-details.component';
import {DepartmentUpdateComponent} from './components/department/update/department-update.component';


const routes: Routes = [
  {path: '', redirectTo: 'employeesList', pathMatch: 'full'},
  {path: 'employeesList', component: EmployeeListComponent},
  {path: 'employeeAdd', component: CreateEmployeeComponent},
  {path: 'employeeUpdate/:id', component: UpdateEmployeeComponent},
  {path: 'employeeDetails/:id', component: EmployeeDetailsComponent},
  {path: 'departmentList', component: DepartmentListComponent},
  {path: 'departmentAdd', component: DepartmentCreateComponent},
  {path: 'departmentDetails/:id', component: DepartmentDetailsComponent},
  {path: 'departmentUpdate/id', component: DepartmentUpdateComponent},
  // {path: 'permissionLevel', component:},
  // {path: 'permissionLevelAdd', component: }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
