import { Component, ViewChild } from '@angular/core';
import { ProfileService } from '../../../core/services/profile-service';
import { Profile } from '../../../core/models/profile';
import { CommonModule } from '@angular/common';
import { ProfileModalComponent } from '../profile-modal-component/profile-modal-component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile-component',
  imports: [CommonModule],
  templateUrl: './my-profile-component.html',
  styleUrl: './my-profile-component.css'
})
export class MyProfileComponent {
  id: string = "4978a500-de9b-43a0-6e42-08de00b5fb67";
  user?: Profile;
  errorMessage: string = '';
  selectedItem: Profile | null = null;
  @ViewChild(ProfileModalComponent) modal!: ProfileModalComponent;

  constructor(private profileService: ProfileService, private router:Router) { }

  ngOnInit(): void {
    this.profileService.getEntityDetails(this.id).subscribe(
      (data: Profile) => {
        this.user = data;  
        console.log('User data:', data);
(this.user.roles?.[0]) ?? "User"      },
      (error) => {
        console.error('Error: ', error);
        this.errorMessage = 'Failed to load user profile';
      }
    );
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