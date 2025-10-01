import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../core/services/department-service';

@Component({
  selector: 'app-departments-component',
  imports: [],
  templateUrl: './departments-component.html',
  styleUrl: './departments-component.css'
})
export class DepartmentsComponent implements OnInit {

  constructor(private deptService:DepartmentService){

  }

  ngOnInit(): void {
    
    this.deptService.GetAll().subscribe(
data=>{

    console.log(data)
 
    },
    error => {
   
     console.error('Error: ', error)
    })
  }

  
}
