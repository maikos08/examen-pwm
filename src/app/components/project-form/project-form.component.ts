import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-form',
  imports: [ CommonModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {
  projectService = inject(ProjectService);
  projectForm: FormGroup = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    });
  
    async onSubmit() {
      await this.projectService.addProject(this.projectForm.value);
      this.clearForm();
    }

  clearForm() {
    this.projectForm.reset();
  }
}
