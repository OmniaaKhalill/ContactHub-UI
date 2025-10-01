import { Component } from '@angular/core';
import { ProfileService } from '../../../core/services/profile-service';

@Component({
  selector: 'app-my-profile-component',
  imports: [],
  templateUrl: './my-profile-component.html',
  styleUrl: './my-profile-component.css'
})
export class MyProfileComponent {

  id:string="4978a500-de9b-43a0-6e42-08de00b5fb67"
 constructor(private profileService:ProfileService){

  }

  ngOnInit(): void {
    
    this.profileService.getEntityDetails(this.id).subscribe(
data=>{

    console.log(data)
 
    },
    error => {
   
     console.error('Error: ', error)
    })
  }
}
