import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ProfileService } from '../../../core/services/profile-service';
import { Profile } from '../../../core/models/profile';
import { CommonModule } from '@angular/common';
import { ProfileModalComponent } from '../profile-modal-component/profile-modal-component';
import { ConfirmDeleteComponent } from '../../../common/confirm-delete-component/confirm-delete-component';
import { JobService } from '../../../core/services/job-service';
import { Job } from '../../../core/models/job';
import { FormsModule } from '@angular/forms';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-profiles-component',
  
  imports: [CommonModule, ProfileModalComponent, ConfirmDeleteComponent,FormsModule],
  templateUrl: './profiles-component.html',
  styleUrl: './profiles-component.css',
})
export class ProfilesComponent {
  entities: Profile[] = [];
 filteredEntities: Profile[] = [];
  searchTerm: string = '';
  jobs: Job[] = [];

  selectedItemName: string = '';
  selectedItem: Profile | null = null;

  @ViewChild('deleteModal') deleteModal!: ConfirmDeleteComponent;
  @ViewChild(ProfileModalComponent) modal!: ProfileModalComponent;
  
  constructor(private profileService: ProfileService, private jobService: JobService ,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadJob();
   
    this.loadProfiles();
     console.log(this.entities); // the data appers in console
    
  }

  loadProfiles(): void {
    console.log('Loading profiles...'); // check if ngOnInit fires

    this.profileService.GetAll().subscribe({
      next: (data) => {
        this.entities = data;
        this.entities = this.entities.map((profile) => ({
          ...profile,
          jobName: this.getJobName(profile.jobId), // use profile.jobId, not profile.id
        }));

        this.filteredEntities = this.entities; 
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading profiles:', err);
      },
    });
  }

  loadJob(): void {
    this.jobService.GetAll().subscribe({
      next: (data) => {
        this.jobs = data;
      },
      error: (err) => console.error('Error loading departments', err),
    });
  }
  getJobName(jobId: string): string | null {
    const job = this.jobs.find((d) => d.id === jobId);
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

 saveProfile(
  form: any
 ) {

  console.log('Form data to save:', form);
    if (this.selectedItem) {
      this.profileService.update(form, this.selectedItem.id).subscribe(() => this.loadProfiles());
    } else {
      this.profileService.Create(form).subscribe(() => this.loadProfiles());
    }
}


  ngOnDestroy(): void {
    this.entities = [];
  }

    onSearch() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredEntities = this.entities;
     
      return;
    }

    this.filteredEntities = this.entities.filter(profile =>
      (profile.fullName?.toLowerCase().includes(term)) ||
      (profile.email?.toLowerCase().includes(term)) ||
      (profile.jobName?.toLowerCase().includes(term)) ||
      (profile.phoneNumber?.toLowerCase().includes(term)) ||
      (profile.address?.toLowerCase().includes(term)) ||
      (profile.role?.toLowerCase().includes(term))
    );
  }


exportToExcel(): void {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Profiles');

  worksheet.columns = [
    { header: 'Name', key: 'fullName' },
    { header: 'Email', key: 'email' },
    { header: 'Job', key: 'jobName' },
    { header: 'Phone', key: 'phoneNumber' },
    { header: 'Address', key: 'address' },
    { header: 'Role', key: 'role' },
  ];

  this.filteredEntities.forEach(profile => {
    worksheet.addRow({
      fullName: profile.fullName,
      email: profile.email,
      jobName: profile.jobName,
      phoneNumber: profile.phoneNumber || '-',
      address: profile.address || '-',
      role: profile.role,
    });
  });

  workbook.xlsx.writeBuffer().then(buffer => {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Profiles.xlsx');
  });
}

}
