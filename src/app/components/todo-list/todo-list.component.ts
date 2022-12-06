import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Task } from 'src/app/class/task.model';
import { TodolistService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  public tasks: Task[] = [];
  public tasks$!: Observable<Task[]>;
  public subscribe! : Subscription | undefined;

  constructor(public todo: TodolistService) {}

  ngOnInit(): void {
    this.tasks$ = this.todo.getTasks();
    this.getTasks();
  }

  ngOnDestroy(): void {
    this.subscribe?.unsubscribe();
  }

  get nbTrue(): number {
    return (this.tasks?.length) ? this.tasks.filter((task) => task.completed).length : 0;
  }

  get nbTasks(): number {
    return (this.tasks?.length) ? this.tasks.length : 0;
  }

  get percent(): number {
    return this.nbTasks != 0 ? (this.nbTrue / this.nbTasks * 100) : 0;
  }

  get textColor(): string {
    return this.percent > 50 ? 'green' : 'red';
  }

  public isBold(): boolean {
    return this.tasks?.length > 0 ? true : false;
  }

  getTasks(): void {
    this.subscribe = this.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  trackByFunction(index: number, item: any): string {
    return item.id;
  }

}
