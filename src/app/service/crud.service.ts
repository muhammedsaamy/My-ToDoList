import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  serviceUrl:string
  constructor(private http:HttpClient) {
    this.serviceUrl='http://localhost:3000/tasks'
  }
  addTask(task:Task):Observable<Task>
  {
    return this.http.post<Task>(this.serviceUrl,task)
  }
  getAllTask():Observable<Task[]>
  {
    return this.http.get<Task[]>(this.serviceUrl)
  }
  deletTask(task:Task):Observable<Task>
  {
    return this.http.delete<Task>(this.serviceUrl+'/'+task.id)
  }
  Task(task:Task):Observable<Task>
  {
    return this.http.post<Task>(this.serviceUrl,task)
  }
  editTask(task:Task):Observable<Task>
  {
    return this.http.put<Task>(this.serviceUrl+'/'+task.id,task)
  }
}
