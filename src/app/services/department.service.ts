import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Department} from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseUrl = 'http://localhost:8080/api/departments/';

  constructor(private http: HttpClient) {
    this.getDepartmentList();
  }

  getDepartment(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createDepartment(department: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}`, department);
  }

  updateDepartment(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }

  getDepartmentList(): Observable<Array<Department>> {
    return this.http.get<Array<Department>>(`${this.baseUrl}`);
  }

  getDepartmentListPage(page: number): Observable<Array<Department>>{
    return this.http.get<Array<Department>>(this.baseUrl + '/list?page=' + page);
  }

}
