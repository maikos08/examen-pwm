import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form.component';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employees',
  imports: [ CommonModule, ReactiveFormsModule, FormsModule, EmployeeFormComponent ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
  isEditing: boolean = false;
  employees: Employee[] = [];
  partialEmployee: Partial<Employee> = {};
  employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees => this.employees = employees));
  }

  async deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id);
  }

  changeToEditMode(employee: Employee) {
    this.isEditing = !this.isEditing;
    this.partialEmployee = {...employee};
  }

  changeToNormaMode() {
    this.isEditing = !this.isEditing;
    this.partialEmployee = {};
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.partialEmployee);
    this.changeToNormaMode();
  }

}
