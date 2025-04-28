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
import { Employee } from '../models/employee';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  firestore = inject(Firestore);
  employeeCollection = collection(this.firestore, 'employees');

  addEmployee(employee: Employee) {
    return addDoc(this.employeeCollection, employee);
  }
  
  getEmployees(): Observable<Employee[]> {
    return collectionData(this.employeeCollection, { idField: 'id'}) as Observable<Employee[]>;
  }

  getEmployee(id: string): Observable<Employee> {
    const employeeDoc = doc(this.firestore, `employees/${id}`);
    return docData(employeeDoc  , { idField: 'id'}) as Observable<Employee>;
  }

  updateEmployee(employee: Partial<Employee>) {
    const employeeDoc = doc(this.firestore, `employees/${employee.id}`);
    return updateDoc(employeeDoc, employee);
  }

  deleteEmployee(id: String) {
    const employeeDoc = doc(this.firestore, `employees/${id}`);
    return deleteDoc(employeeDoc);
  }
  

}
