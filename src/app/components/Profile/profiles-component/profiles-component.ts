import { Component, ViewChild } from '@angular/core';
import { ProfileService } from '../../../core/services/profile-service';
import { Profile } from '../../../core/models/profile';
import { CommonModule } from '@angular/common';
import { ProfileModalComponent } from '../profile-modal-component/profile-modal-component';
import { ConfirmDeleteComponent } from '../../../common/confirm-delete-component/confirm-delete-component';
import { JobService } from '../../../core/services/job-service';
import { Job } from '../../../core/models/job';

@Component({
  selector: 'app-profiles-component',
  imports: [CommonModule, ProfileModalComponent, ConfirmDeleteComponent],
  templateUrl: './profiles-component.html',
  styleUrl: './profiles-component.css'
})
export class ProfilesComponent {

entities: Profile[] = [];

jobs: Job[] = [];


  selectedItemName: string = '';
  selectedItem: Profile | null = null;

  @ViewChild('deleteModal') deleteModal!: ConfirmDeleteComponent;
  @ViewChild(ProfileModalComponent) modal!: ProfileModalComponent;
  constructor(private profileService: ProfileService,private jobService:JobService) {

  }

  ngOnInit(): void {

    this.loadProfiles()

  }


loadProfiles(): void {
  console.log("Loading profiles...");  // check if ngOnInit fires

  this.profileService.GetAll().subscribe({
    next: (data) => {
      this.entities = data;               
    this.entities =  this.entities.map(job => ({
          ...job,
          jobName: this.getJobName(job.id)
        }));
    },
    error: (err) => {
      console.error('Error loading profiles:', err);
    }
  });
}
 
  loadJob(): void {
    this.jobService.GetAll().subscribe({
      next: (data) => {
        this.jobs = data;
      },
      error: (err) => console.error('Error loading departments', err)
    });
  }
  getJobName(jobId: string): string | null {
    const job = this.jobs.find(d => d.id === jobId);
    return job ? job.name : null;
  }
  addProfile() {
    this.selectedItem = null;
    this.modal.mode = 'create';
    this.modal.open();
  }

  editProfile(profile: Profile) {
    this.selectedItem = profile;
    this.modal.mode = 'update';

    this.modal.open();
  }

  saveProfile(form: any) {
    if (this.selectedItem) {
      this.profileService.update(form, this.selectedItem.id).subscribe(() => this.loadProfiles());
    } else {
      this.profileService.Create(form).subscribe(() => this.loadProfiles());
    }
  }

 openDelete(profile: Profile) {
    this.selectedItem = profile;
    this.selectedItemName = profile.fullName;
    this.deleteModal.open();
  }


    confirmDelete() {
    if (this.selectedItem) {
      this.profileService.Delete(this.selectedItem.id).subscribe(() => {
        this.loadProfiles();
      });
    }
  }


  ngOnDestroy(): void {
  this.entities = [];
}
}