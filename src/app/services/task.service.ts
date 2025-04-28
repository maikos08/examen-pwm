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
import { Task } from '../models/task';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  firestore = inject(Firestore);
  taskCollection = collection(this.firestore, 'tasks');

  addTask(task: Task) {
    return addDoc(this.taskCollection, task);
  }
  
  getTasks(): Observable<Task[]> {
    return collectionData(this.taskCollection, { idField: 'id'}) as Observable<Task[]>;
  }

  getTask(id: string): Observable<Task> {
    const taskDoc = doc(this.firestore, `tasks/${id}`);
    return docData(taskDoc  , { idField: 'id'}) as Observable<Task>;
  }

  updateTask(task: Partial<Task>) {
    const taskDoc = doc(this.firestore, `tasks/${task.id}`);
    return updateDoc(taskDoc, task);
  }

  deleteTask(id: String) {
    const TaskDoc = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(TaskDoc);
  }
  

}
