import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  taskService = inject(TaskService);
  taskForm: FormGroup = new FormGroup({
    employee: new FormControl(),
    project: new FormControl(),
    task: new FormControl(),
    });
  
    async onSubmit() {
      await this.taskService.addTask(this.taskForm.value);
      this.clearForm();
    }

  clearForm() {
    this.taskForm.reset();
  }
}
