import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './model/employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      // 'Authorization': 'Bearer xty'

    })
  };
  BASE_URL = "http://localhost:5000/emp"
  constructor(private http: HttpClient) { }


  getEmployees1(): Observable<any> {
    return this.http.get(this.BASE_URL + "/list",{'headers': this.httpOptions.headers});
  }

  getEmloyeeById():Observable<any>{
    return this.http.get('http://localhost:5000/emp/getEmployeeBy/65ec849efc40f7f3cabc8eda', this.httpOptions)
  }

  addEmployee(req: Employee): Observable<any> {
    return this.http.post(this.BASE_URL + '/add-emp', req)
  }

  updateEmployee(req: Employee,id): Observable<any> {
    return this.http.put(this.BASE_URL + "/updateEmployee/" +id, req);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(this.BASE_URL + '/deleteEmployee/' + id);
  }


}
