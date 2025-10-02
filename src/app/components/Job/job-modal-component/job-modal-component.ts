import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job, JobForCreate, JobForUpdate } from '../../../core/models/job';
import { FormsModule } from '@angular/forms';
import { Department } from '../../../core/models/department';
declare var bootstrap: any;
@Component({
  selector: 'app-job-modal-component',
  imports: [FormsModule],
  templateUrl: './job-modal-component.html',
  styleUrl: './job-modal-component.css'
})
export class JobModalComponent {
 @Input() mode: 'create' | 'update' = 'create';
@Input() job: Job | null = null;
 @Input() departments: Department[] = [];
  @Output() save = new EventEmitter<JobForCreate|JobForUpdate>();

  form: Job = new Job('', '', '', null);
  modal: any;

  ngOnChanges() {

    console.log(this.departments)
    if (this.job) {
      this.form = { ...this.job }; // copy for editing
    } else {
      this.form = new Job('', '', '', null);
    }
  }

  open() {
    const modalElement = document.getElementById('jobModal');
    this.modal = new bootstrap.Modal(modalElement);
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

onSubmit() {
  if (this.mode === 'create') {
    // generate new GUID for the new job
    const newJob = new JobForCreate(
      this.form.name,
      this.form.departmentId
    );
   
    this.save.emit(newJob);

  } else if (this.mode === 'update') {
    // keep the existing job id, just update fields
    const updatedJob = new JobForUpdate(
      this.form.id,
      this.form.name,
      this.form.departmentId
    );
    this.save.emit(updatedJob);
  }

  this.close();
}
}

