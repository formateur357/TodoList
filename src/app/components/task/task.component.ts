import { Component, Input } from '@angular/core';
import { Task } from 'src/app/class/task.model';
import { TodolistService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() public task!: Task;
  // @Output() public change: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public todo: TodolistService) {}

  public get source(): string {
    // let src: string = "../../../assets/img/";
    // src += (this.task.completed) ? "valid.jpg" : "enCours.jpg";
    return this.task.completed ? "done" : "incomplete_circle";
  }

  public get color(): string {
    return this.task.completed ? "warn" : "primary";
  }

  public toggleComplete(): void {
    this.todo.toggleComplete(this.task.id)
  }

  // public send() {
  //   this.toggleComplete();
  //   this.change.emit(this.task.completed);
  // }

  public getComplete(): string {
    return this.task.completed ? "terminee " : "en cours ";
  }

  public getBadgeVariant(): string {
    let str: string = "d-inline float-right badge badge-";
    str += this.task.completed ? "success" : "warning";
    return str
  }

  public getItemVariant(): string {
    let str: string = "list-group-item list-group-item-";
    str += this.task.completed ? "success" : "warning";
    // if (this.complete)
    //   return "list-group-item list-group-item-success";
    // else
    //   return "list-group-item list-group-item-warning";
    return str
  }

  public getButtonText(): string {
    return this.task.completed ? "Annuler" : "Terminer";
  }

}
