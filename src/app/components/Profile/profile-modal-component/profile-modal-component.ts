import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile, ProfileForCreate, ProfileForUpdate } from '../../../core/models/profile';
import { FormsModule } from '@angular/forms';
import { Job } from '../../../core/models/job';
declare var bootstrap: any;
@Component({
  selector: 'app-profile-modal-component',
  imports: [FormsModule],
  templateUrl: './profile-modal-component.html',
  styleUrl: './profile-modal-component.css'
})
export class ProfileModalComponent {

 @Input() mode: 'create' | 'update' = 'create';
  @Input() profile: ProfileForUpdate | null = null;
  @Input() jobs: Job[] = [];

  @Output() save = new EventEmitter<ProfileForCreate | ProfileForUpdate>();

  form: any = {};
  modal: any;
  photoPreview: string | null = null;

  ngOnChanges() {
    if (this.mode === 'update' && this.profile) {
      this.form = { ...this.profile };
this.photoPreview = this.profile.photo ? URL.createObjectURL(this.profile.photo) : null;
    } else {
      this.form = new ProfileForCreate(
        '', '', null, null, '', '', [], '',0,
        new Date(), 
              
      );
      this.photoPreview = null;
    }
  }

  open(profile?: ProfileForUpdate) {
    if (this.mode === 'create' && !this.profile) {
      this.form = new ProfileForCreate(
        '', '', null, null, '', '', [], '',0,
        new Date(),
        
      );
      this.photoPreview = null;
    } else {
      this.mode = 'update';
      this.form = { ...profile };
this.photoPreview = this.profile?.photo ? URL.createObjectURL(this.profile.photo) : null;
    }

    const modalElement = document.getElementById('profileModal');
    this.modal = new bootstrap.Modal(modalElement);
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

  calculateAge() {
    if (this.form.birthDate) {
      const birthDate = new Date(this.form.birthDate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.form.age = age;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.photo = file;

      // preview
      const reader = new FileReader();
      reader.onload = () => this.photoPreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.mode === 'create') {
      const dto = new ProfileForCreate(
        this.form.fullName,
        this.form.email,
        this.form.phoneNumber,
        this.form.address,
        this.form.userName,
        this.form.password,
        this.form.roles || [],
        this.form.jobId,
        this.form.age,
        this.form.birthDate,
        this.form.photo
      );
      dto.age = this.form.age;
      this.save.emit(dto);
    } else {
      const dto = new ProfileForUpdate(
        this.form.id,
        this.form.fullName,
        this.form.email,
        this.form.phoneNumber,
        this.form.address,
        this.form.userName,
        this.form.password,
        this.form.roles,
        this.form.age,
        this.form.birthDate,
        this.form.photo,
      );
      this.save.emit(dto);
    }
    this.close();
  }
}