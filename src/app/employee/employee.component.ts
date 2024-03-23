import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../model/employee';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  empList: Employee[] =[];
  empForm: FormGroup;
  selectedEmp: Employee;
  constructor(private empService: EmployeeService) { }

  ngOnInit() {
    this.getEmployeeList();
    this.buildForm();

  }

  updateEmployeeDetails(){
      this.empService.updateEmployee(this.empForm.value, this.selectedEmp.id).subscribe((res:any)=>{
        this.getEmployeeList();
        this.empForm.reset();
        alert("Details updated successfully!!")
      })
  }

  onAddOrUpdateEmployeeDetails(){
    if(this.selectedEmp){
      this.updateEmployeeDetails();
      return;
    }
    if(this.empForm.valid){
      this.empService.addEmployee(this.empForm.value).subscribe((res:any)=>{
        console.log('res', res);
        this.empForm.reset();
        this.getEmployeeList();
      });
    }
  }

  getEmployeeList(){
    this.empService.getEmployees1().subscribe((res:any)=>{
      this.empList = res.data;
    })
  }

  editEmployee(emp:Employee){
    console.log('emp', emp);
    this.selectedEmp = emp;
    this.empForm.patchValue(emp);
  }

  deleteEmployee(emp:Employee){
    this.empService.deleteEmployee(emp.id).subscribe((res:any)=>{
      if(res){
        alert('Employee details deleted Successfully!!..'+emp.id);
        this.getEmployeeList();
      }
    })
  }

  buildForm(){
    this.empForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      city: new FormControl(''),
      phone: new FormControl(''),
    })
  }

}
