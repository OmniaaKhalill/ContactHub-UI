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



  ngOnChanges() {
    if (this.mode === 'update' && this.profile) {
      this.form = { ...this.profile }; 
    } else {
      this.form = new ProfileForCreate('', '', null, null, '', '', []);
    }
  }

  open(profile?: ProfileForUpdate) {

 if (this.mode === 'create' && !this.profile ) {
    this.mode = 'create';
    this.form = new ProfileForCreate('', '', null, null, '', '', []);
  }


    else  {
    this.mode = 'update';
    this.form = { ...profile };
  }
  const modalElement = document.getElementById('profileModal');
  this.modal = new bootstrap.Modal(modalElement);
  this.modal.show();
}
  close() {
    this.modal.hide();
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
        this.form.roles || []
      );
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
        this.form.roles
      );
      this.save.emit(dto);
    }
    this.close();
  }
}