import { Component } from '@angular/core';
import { JobService } from '../../../core/services/job-service';

@Component({
  selector: 'app-jobs-component',
  imports: [],
  templateUrl: './jobs-component.html',
  styleUrl: './jobs-component.css'
})
export class JobsComponent {
 constructor(private jobService:JobService){

  }

  ngOnInit(): void {
    
    this.jobService.GetAll().subscribe(
data=>{

    console.log(data)
 
    },
    error => {
   
     console.error('Error: ', error)
    })
  }
}
