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
  submitted = false;
  errors = false;

  sexs = ['kobieta', 'meżczyzna'];

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      pesel: ['', [Validators.required, Validators.pattern('[0-9]{4}[0-3]{1}[0-9]{6}')]],
      sex: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]]
    });
  }

  save() {
    this.employee.firstName = this.registerForm.value.firstName;
    this.employee.lastName = this.registerForm.value.lastName;
    this.employee.email = this.registerForm.value.email;
    this.employee.pesel = this.registerForm.value.pesel;
    this.employee.sex = this.registerForm.value.sex;
    this.employee.birth_date = this.registerForm.value.dateOfBirth;
    this.employeeService.createEmployee(this.employee)
      .subscribe(data => console.log(data), error => console.log(error));
    this.employee = new Employee();
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.errors = true;
      return;
    } else {
      this.errors = false;
      this.save();
    }

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));


  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }

}
