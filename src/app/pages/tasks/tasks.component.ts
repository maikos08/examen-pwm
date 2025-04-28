import { Component, inject } from '@angular/core';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  imports: [ TaskFormComponent, ReactiveFormsModule, FormsModule, CommonModule ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  isEditing: boolean = false;
  tasks: Task[] = [];
  partialTask: Partial<Task> = {};
  taskService = inject(TaskService);

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks => this.tasks = tasks));
  }

  async deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  changeToEditMode(task: Task) {
    this.isEditing = !this.isEditing;
    this.partialTask = {...task};
  }

  changeToNormaMode() {
    this.isEditing = !this.isEditing;
    this.partialTask = {};
  }

  updateTask() {
    this.taskService.updateTask(this.partialTask);
    this.changeToNormaMode();
  }
}
