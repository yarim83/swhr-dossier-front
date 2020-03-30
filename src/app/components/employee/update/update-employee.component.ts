import {Component, OnInit} from '@angular/core';
import {Employee} from '../../../models/employee';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../../../employee.service';
import {FormGroup, Validators} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DepartmentService} from '../../../services/department.service';
import {Department} from '../../../models/department';


@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  private departments$: Array<Department>;

  id: number;
  employee: Employee;
  submitted = false;
  errors = false;
  registerForm: FormGroup;

  selectedFile?: File;
  retrievedImage?: any;
  base64Data?: any;
  retrieveResonse?: any;
  message: string;
  imgAdded: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService,
              private departmentService: DepartmentService,
              private formBuilder: FormBuilder,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.employee = new Employee();
    this.getDepartmentList();

    this.validate();
    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployee(this.id)
      .subscribe(data => {
        this.employee = data;
        this.getImage();
      }, error => console.log(error));
  }

  get formControls() {
    return this.registerForm.controls;
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.id, this.employee)
      .subscribe(data => {
        this.onUpload();
        console.log(data);
      }, error => {
        console.log(error);
      });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.errors = true;
      return;
    } else {
      this.errors = false;

      this.updateEmployee();
    }
  }

  gotoList() {
    this.employee = new Employee();
    this.router.navigate(['/employeesList']);
  }

  validate() {
    this.registerForm = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required]],
        dateOfBirth: ['', [Validators.required]],
        street: ['', [Validators.required, Validators.minLength(3)]],
        streetNumber: ['', [Validators.required]],
        city: ['', [Validators.required, Validators.minLength(3)]],
        departments: ['', [Validators.required]]
      }
    );
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
          // this.photo = response.body;
          // this.save(this.photo);
        } else {
          this.message = 'Fail';
        }
      });
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
