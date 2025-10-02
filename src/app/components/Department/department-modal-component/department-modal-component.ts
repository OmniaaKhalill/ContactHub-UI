import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Department } from '../../../core/models/department';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;
@Component({
  selector: 'app-department-modal-component',
  imports: [FormsModule],
  templateUrl: './department-modal-component.html',
  styleUrl: './department-modal-component.css'
})
export class DepartmentModalComponent {

@Input() department: Department | null = null;
  @Output() save = new EventEmitter<Department>();

  form: Department = new Department('', '');

  open(dept?: Department) {
    this.form = dept ? { ...dept } : new Department('', '');
    const modal = document.getElementById('departmentModal') as any;
    if (modal) new bootstrap.Modal(modal).show();
  }

  close() {
    const modalEl = document.getElementById('departmentModal');
    const modal = bootstrap.Modal.getInstance(modalEl!);
    modal?.hide();
  }

  onSubmit() {
    if (!this.form.id) {
      this.form.id = crypto.randomUUID(); // generate ID on create
    }
    this.save.emit(this.form);
    this.close();
  }
}
