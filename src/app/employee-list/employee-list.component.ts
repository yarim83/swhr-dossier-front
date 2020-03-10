import {Component, OnInit} from '@angular/core';
import {Employee} from '../models/employee';
import {EmployeeService} from '../employee.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  private page: number = 0;
  pages: Array<number>;
  //employees$: Observable<Array<Employee>>;
  private employees$: Array<Employee>;
  constructor(private employeeService: EmployeeService, private router: Router) {
  }

  ngOnInit() {
    this.reloadData2();
  }

  // reloadData() {
  //   this.employees$ = this.employeeService.getEmployeesList();
  // }

  reloadData2() {
    this.employeeService.getEmployeesListPage(this.page).subscribe(
      data => {
        this.employees$ = data[`content`];
        this.pages = new Array<number>(data[`totalPages`]);
      },
      (error) => {
        console.log(error.error.message);
      });
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.reloadData2();
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData2();
        },
        error => console.log(error));
  }

  employeeDetails(id: number) {
    this.router.navigate(['details', id]);
  }

}
