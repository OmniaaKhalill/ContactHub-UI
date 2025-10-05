import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentService } from '../../../core/services/department-service';
import { DepartmentModalComponent } from '../department-modal-component/department-modal-component';
import { ConfirmDeleteComponent } from '../../../common/confirm-delete-component/confirm-delete-component';
import { Department } from '../../../core/models/department';

@Component({
  selector: 'app-departments-component',
  imports: [DepartmentModalComponent,ConfirmDeleteComponent],
  templateUrl: './departments-component.html',
  styleUrl: './departments-component.css'
})
export class DepartmentsComponent implements OnInit {

  entities: Department[] = [];
  selectedItem: Department | null = null;
  selectedItemName: string = '';

  @ViewChild('deleteModal') deleteModal!: ConfirmDeleteComponent;
  @ViewChild(DepartmentModalComponent) modal!: DepartmentModalComponent;

  constructor(private deptService: DepartmentService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.deptService.GetAll().subscribe({
      next: (data) => {
        this.entities = data;
        console.log('Departments loaded:', this.entities);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading departments:', err)
    });
  }

  addDepartment(): void {
    this.selectedItem = null;
    this.modal.open();
  }

  editDepartment(dept: Department): void {
    this.selectedItem = { ...dept };
    this.modal.open(this.selectedItem);
  }

  deleteDepartment(dept: Department): void {
    this.selectedItem = dept;
    this.selectedItemName = dept.name;
    this.deleteModal.open();
  }

  confirmDelete(): void {
    if (!this.selectedItem) return;
    this.deptService.Delete(this.selectedItem.id).subscribe({
      next: () => this.loadDepartments(),
      error: (err) => console.error('Error deleting department:', err)
    });
  }

  saveDepartment(dept: Department): void {
    if (this.selectedItem) {
      // update
      this.deptService.update( dept,dept.id).subscribe({
        next: () => this.loadDepartments(),
        error: (err) => console.error('Error updating department:', err)
      });
    } else {
      // create
      this.deptService.Create(dept).subscribe({
        next: () => this.loadDepartments(),
        error: (err) => console.error('Error creating department:', err)
      });
    }
  }
}
