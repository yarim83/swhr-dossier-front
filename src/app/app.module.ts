import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './components/employee/create/create-employee.component';
import { EmployeeDetailsComponent } from './components/employee/details/employee-details.component';
import { EmployeeListComponent } from './components/employee/list/employee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateEmployeeComponent } from './components/employee/update/update-employee.component';
import { ConfirmationPopoverModule} from 'angular-confirmation-popover';
import { DepartmentCreateComponent } from './components/department/create/department-create.component';
import { DepartmentDetailsComponent } from './components/department/details/department-details.component';
import { DepartmentListComponent } from './components/department/list/department-list.component';
import { DepartmentUpdateComponent } from './components/department/update/department-update.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeListComponent,
    UpdateEmployeeComponent,
    DepartmentCreateComponent,
    DepartmentDetailsComponent,
    DepartmentListComponent,
    DepartmentUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
