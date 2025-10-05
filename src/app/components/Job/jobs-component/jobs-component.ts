import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { JobService } from '../../../core/services/job-service';
import { Job } from '../../../core/models/job';
import { ConfirmDeleteComponent } from '../../../common/confirm-delete-component/confirm-delete-component';
import { JobModalComponent } from '../job-modal-component/job-modal-component';
import { DepartmentService } from '../../../core/services/department-service';
import { Department } from '../../../core/models/department';

@Component({
  selector: 'app-jobs-component',
  imports: [ConfirmDeleteComponent,JobModalComponent],
  templateUrl: './jobs-component.html',
  styleUrl: './jobs-component.css'
})
export class JobsComponent {
 entities: Job[] = [];



  selectedItemName: string = '';
  selectedItem: Job | null = null;
   departments: Department[] = [];

  @ViewChild('deleteModal') deleteModal!: ConfirmDeleteComponent;
  @ViewChild(JobModalComponent) modal!: JobModalComponent;
  constructor(private jobService: JobService,private departmentService: DepartmentService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
      this.loadDepartments();
    this.loadJobs();
  }
  loadDepartments(): void {
    this.departmentService.GetAll().subscribe({
      next: (data) => {
        this.departments = data;
            this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading departments', err)
    });
  }
 loadJobs(): void {
    this.jobService.GetAll().subscribe({
      next: (data) => {

 this.entities=data
        this.entities =  this.entities.map(job => ({
          ...job,
          departmentName: this.getDepartmentName(job.departmentId)
        }));
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading jobs', err)
    });
  }

  getDepartmentName(departmentId: string): string | null {
    const dept = this.departments.find(d => d.id === departmentId);
    return dept ? dept.name : null;
  }
  addJob(): void {
    this.selectedItem = null;
   
      this.modal.mode = 'create';
      this.modal.open()
  }

  editJob(job: Job): void {
    this.selectedItem = job;
      this.modal.mode = 'update';
      this.modal.open()
  }

  deleteJob(job: Job): void {
    this.selectedItem = job;
    this.selectedItemName = job.name;
    this.deleteModal.open()
  }





    saveJob(form: any) {
    if (this.selectedItem) {
      this.jobService.update(form, this.selectedItem.id).subscribe(() => this.loadJobs());
    } else {
      this.jobService.Create(form).subscribe(() => this.loadJobs());
    }
  }

  confirmDelete(): void {
    if (!this.selectedItem) return;
       this.jobService.Delete(this.selectedItem.id).subscribe(() => this.loadJobs());

  }
}
