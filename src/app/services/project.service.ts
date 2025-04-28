import {inject, Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc
} from '@angular/fire/firestore';
import { Project } from '../models/project';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  firestore = inject(Firestore);
  projectCollection = collection(this.firestore, 'projects');

  addProject(project: Project) {
    return addDoc(this.projectCollection, project);
  }
  
  getProjects(): Observable<Project[]> {
    return collectionData(this.projectCollection, { idField: 'id'}) as Observable<Project[]>;
  }

  getProject(id: string): Observable<Project> {
    const projectDoc = doc(this.firestore, `projects/${id}`);
    return docData(projectDoc  , { idField: 'id'}) as Observable<Project>;
  }

  updateProject(project: Partial<Project>) {
    const projectDoc = doc(this.firestore, `projects/${project.id}`);
    return updateDoc(projectDoc, project);
  }

  deleteProject(id: String) {
    const projectDoc = doc(this.firestore, `projects/${id}`);
    return deleteDoc(projectDoc);
  }
  

}
