import { Employee } from '../models/employee';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Photo} from '../models/photo';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  id: number;
  employee: Employee;

  retrievedImage?: any;
  base64Data?: any;
  retrieveResonse?: any;
  message: string;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService,
              private http: HttpClient) {}

  ngOnInit() {
    this.employee = new Employee();
    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployee(this.id)
      .subscribe(data => {
        console.log(data);
        this.employee = data;
        this.getImage();
      }, error => console.log(error));

  }

  list(){
    this.router.navigate(['employees']);
  }

  update(id: number){
    this.router.navigate(['update', id]);
  }

  getImage() {
    this.http.get('http://localhost:8080/api/photo/' + this.employee.photoId)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
}
