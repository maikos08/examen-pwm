import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  imports: [ CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  employeeService = inject(EmployeeService);
  employeeForm: FormGroup = new FormGroup({
    name: new FormControl(),
    deparment: new FormControl(),
    });
  
    async onSubmit() {
      await this.employeeService.addEmployee(this.employeeForm.value);
      this.clearForm();
    }

  clearForm() {
    this.employeeForm.reset();
  }
}
