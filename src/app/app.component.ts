import { Component } from '@angular/core';
import { Task } from './class/task.model';
import { TodolistService } from './services/todolist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'todo';
  // public tasks!: Task[];
  // public prom!: Promise<string>;

  constructor(public todo: TodolistService) {
    // this.prom = new Promise<string>(() => {
    //   setTimeout(() => {
    //   }, 1000)
    //   console.log("ici")
    //   return "coucou";
    // })
  }

  get nbTrue(): number {
    return (this.todo.tasks?.length) ? this.todo.tasks.filter((task) => task.completed).length : 0;
  }

  get nbTasks(): number {
    return (this.todo.tasks?.length) ? this.todo.tasks.length : 0;
  }

  get percent(): number {
    return this.nbTasks != 0 ? (this.nbTrue / this.nbTasks * 100) : 0;
  }

  get textColor(): string {
    return this.percent > 50 ? 'green' : 'red';
  }

  public isBold(): boolean {
    return this.todo.tasks?.length > 0 ? true : false;
  }


  trackByFunction(index: number, item: any): string {
    return item.id;
  }
}
