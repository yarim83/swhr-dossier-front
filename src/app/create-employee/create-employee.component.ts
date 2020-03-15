import {EmployeeService} from '../employee.service';
import {Employee} from '../models/employee';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  registerForm: FormGroup;
  employee: Employee = new Employee();
  dupa: Employee = new Employee();
  submitted = false;

  sexs = ['kobieta', 'meżczyzna'];

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      pesel: ['', Validators.required],
      sex: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  save() {
    this.dupa.firstName  = this.registerForm.value.firstName;
    this.dupa.lastname = this.registerForm.value.lastName;
    this.dupa.email = this.registerForm.value.email;
    this.dupa.pesel = this.registerForm.value.pesel;
    this.dupa.sex = this.registerForm.value.sex;
    this.dupa.birth_date = this.registerForm.value.dateOfBirth;

    console.log(this.dupa);
    this.employeeService.createEmployee(this.dupa)
      .subscribe(data => console.log(data), error => console.log(error));
    this.employee = new Employee();
    this.gotoList();
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));

    this.save();
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }
}
