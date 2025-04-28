import { Component, inject } from '@angular/core';
import { ProjectFormComponent } from '../../components/project-form/project-form.component';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-projects',
  imports: [ CommonModule, ReactiveFormsModule, FormsModule, ProjectFormComponent ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  isEditing: boolean = false;
  projects: Project[] = [];
  partialProject: Partial<Project> = {};
  projectService = inject(ProjectService);

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects => this.projects = projects));
  }

  async deleteProject(id: string) {
    this.projectService.deleteProject(id);
  }

  changeToEditMode(project: Project) {
    this.isEditing = !this.isEditing;
    this.partialProject = {...project};
  }

  changeToNormaMode() {
    this.isEditing = !this.isEditing;
    this.partialProject = {};
  }

  updateProject() {
    this.projectService.updateProject(this.partialProject);
    this.changeToNormaMode();
  }

}
