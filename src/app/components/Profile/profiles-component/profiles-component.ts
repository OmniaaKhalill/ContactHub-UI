import { Component } from '@angular/core';
import { ProfileService } from '../../../core/services/profile-service';
import { Profile } from '../../../core/models/profile';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profiles-component',
  imports: [CommonModule],
  templateUrl: './profiles-component.html',
  styleUrl: './profiles-component.css'
})
export class ProfilesComponent {

  entities!:Profile[]

  constructor(private profileService:ProfileService){

  }

  ngOnInit(): void {
    
    
    this.profileService.GetAll().subscribe(
data=>{this.loadProfiles()},
    error => { console.error('Error: ', error)})
  }


   loadProfiles(): void {
    this.profileService.GetAll().subscribe({
      next: (data) => {
        this.entities = data;
        console.log('Profiles:', this.entities);
      },
      error: (err) => {
        console.error('Error loading profiles:', err);
      }
    });}
  onDetails(profile: Profile): void {
  console.log("Details clicked:", profile);
  // Navigate to details page or open modal
}

onUpdate(profile: Profile): void {
  console.log("Update clicked:", profile);
  // Open update modal or navigate to edit form
}

onDelete(profile: Profile): void {
  if (confirm(`Are you sure you want to delete ${profile.fullName}?`)) {
    console.log("Delete confirmed:", profile);
    // Call service to delete the user
  }
}}
