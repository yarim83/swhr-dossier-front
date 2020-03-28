import {EmployeeService} from '../../../employee.service';
import {Employee} from '../../../models/employee';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {Validators} from '@angular/forms';
import {Address} from '../../../models/address';
import {Photo} from '../../../models/photo';
import {HttpClient} from '@angular/common/http';
import {DepartmentService} from '../../../services/department.service';
import {Department} from '../../../models/department';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  private departments$: Array<Department>;

  selectedFile?: File;
  message: string;
  imgAdded: boolean = false;
  employeeCreated: boolean = false;

  registerForm: FormGroup;
  employee: Employee = new Employee();
  address: Address = new Address();
  photo: Photo = new Photo();
  submitted = false;
  errors = false;
  sexs = ['kobieta', 'meżczyzna'];
  countrys = ['Polska', 'Niemcy', 'Anglia'];


  constructor(private employeeService: EmployeeService,
              private departmentService: DepartmentService,
              private router: Router,
              private formBuilder: FormBuilder,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.getDepartmentList();

    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      pesel: ['', [Validators.required, Validators.pattern('[0-9]{4}[0-3]{1}[0-9]{6}')]],
      sex: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      street: ['', [Validators.required, Validators.minLength(3)]],
      streetNumber: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      country: ['', [Validators.required]],
      departments: ['', [Validators.required]]
    });
  }

  save(photo: Photo) {
    this.employee.firstName = this.registerForm.value.firstName;
    this.employee.lastName = this.registerForm.value.lastName;
    this.employee.email = this.registerForm.value.email;
    this.employee.pesel = this.registerForm.value.pesel;
    this.employee.sex = this.registerForm.value.sex;
    this.employee.birthDate = this.registerForm.value.dateOfBirth;
    this.address.street = this.registerForm.value.street;
    this.address.city = this.registerForm.value.city;
    this.address.country = this.registerForm.value.country;
    this.address.streetNumber = this.registerForm.value.streetNumber;
    this.employee.address = this.address;
    this.employee.photoId = photo.id;
    this.employee.department_id = this.registerForm.value.departments;
    this.employeeService.createEmployee(this.employee)
      .subscribe(data => {
        this.employeeCreated = true;
        console.log(data);
        },
        error => console.log(error));
    this.employee = new Employee();
  }

  get formControls() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;


    if (this.registerForm.invalid) {
      this.errors = true;
      return;
    } else {
      this.errors = false;
      this.onUpload();
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }


  onFileChange(event) {
    this.selectedFile = event.target.files[0];
    this.imgAdded = true;
  }

  onUpload() {
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    this.http.post('http://localhost:8080/api/photo/upload', uploadImageData, {observe: 'response'})
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Success';
          this.photo = response.body;
          this.save(this.photo);
        } else {
          this.message = 'Fail';
        }
      });
  }

  getDepartmentList() {
    this.departmentService.getDepartmentList().subscribe(
      data => {
        this.departments$ = data;
      },
      error => {
        console.log(error.error.message);
      });
  }

}
