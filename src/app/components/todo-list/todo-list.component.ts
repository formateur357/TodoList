import { Component } from '@angular/core';
import { TodolistService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  constructor(public todo: TodolistService) {}

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
