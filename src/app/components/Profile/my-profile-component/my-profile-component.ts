import { Component, ViewChild } from '@angular/core';
import { ProfileService } from '../../../core/services/profile-service';
import { Profile } from '../../../core/models/profile';
import { CommonModule } from '@angular/common';
import { ProfileModalComponent } from '../profile-modal-component/profile-modal-component';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-my-profile-component',
  imports: [CommonModule],
  templateUrl: './my-profile-component.html',
  styleUrl: './my-profile-component.css'
})
export class MyProfileComponent {
 
  user?: Profile;
  errorMessage: string = '';
  selectedItem: Profile | null = null;
  @ViewChild(ProfileModalComponent) modal!: ProfileModalComponent;

  constructor(private profileService: ProfileService, private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  

private loadUserProfile(): void {
    const userId = this.authService.getUserClaims()?.Id;

    if (!userId) {
      this.errorMessage = 'User not logged in or token invalid';
      return;
    }

    this.errorMessage = '';

    this.profileService.getEntityDetails(userId).subscribe({
      next: (data: Profile) => {
        this.user = data;
        console.log('User data:', data);
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.errorMessage = 'Failed to load user profile';
      },
     
    });
  }



  editProfile(profile: Profile) {


    this.selectedItem = profile;
    this.modal.mode = 'update';
    this.modal.open();


  }

  saveProfile(form: any) {
    if (this.selectedItem) {
      this.profileService.update(form, this.selectedItem.id).subscribe(() => this.ngOnInit());
    } else {
      this.ngOnInit()
    }
  }

  ToHome()
{

  this.router.navigateByUrl("home")
}

}