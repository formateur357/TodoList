import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../class/task.model';

const initialList: Task[] = [
  new Task("Chauffer le dancefloor", true, "Danser le woogie.", new Date()),
  new Task("Partir au Hesscape Game", false, "Comment tu t'en sortiras?", new Date(Date.now())),
  new Task("Apportez des cookies à momie.", true, "Miam des doigts...", new Date("01/01/2020 09:00"))
];

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  private tasks: Task[];
  private _tasks = new BehaviorSubject<Task[]>([]);
  readonly tasks$ = this._tasks.asObservable();
  public prom!: Promise<string>;

  constructor() {
    this.tasks = [];
    this.prom = new Promise<string>((resolve) => {
      setTimeout(() => {
        this.tasks = initialList;
        this.emiter(this.tasks);
        resolve('fini');
      }, 1000)
    })
  }

  public getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  private emiter(tasks: Task[]): void {
    this._tasks.next(Object.assign([], tasks));
  }

  public toggleComplete(id: number) {
    this.tasks[id].completed = !this.tasks[id].completed;
    this.emiter(this.tasks);
  }

  public getTaskById(id: number): Task | null {
    // for (const task of this.tasks) {
    //   if (task.id == id)
    //     return task;
    // }
    // return null;
    return this.tasks.filter(task => task.id == id)[0];
  }
}
