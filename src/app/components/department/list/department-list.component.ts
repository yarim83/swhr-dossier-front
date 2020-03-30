import {Component, OnInit} from '@angular/core';
import {Department} from '../../../models/department';
import {DepartmentService} from '../../../services/department.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  private departmentsPaging$: Observable<Department[]>;
  private departments: Observable<Department[]>;
  pages: Array<number>;
  private page: number = 0;

  constructor(private departmentService: DepartmentService,
              private route: Router) {
  }

  ngOnInit() {
    this.reloadDataPaging();
  }

  reloadData() {
    this.departments = this.departmentService.getDepartmentList();
  }

  reloadDataPaging() {
    this.departmentService.getDepartmentListPage(this.page).subscribe(
      data => {
        console.log(data[`content`]);
        this.departmentsPaging$ = data[`content`];
        this.pages = new Array<number>(data[`totalPages`]);
      },
      (error) => {
        console.log(error.error.message);
      });
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.reloadDataPaging();
  }

  departmentDetails(id: number) {
    this.route.navigate(['departmentDetails', id]);
  }

  departmentUpdate(id: number) {
    this.route.navigate(['departmentUpdate', id]);
  }

  departmentDelete(id: number) {
    this.departmentService.deleteDepartment(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadDataPaging();
        },
        error => console.log(error));
  }


}
