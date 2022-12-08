import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from 'src/app/class/task.model';
import { TodolistService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  constructor(public todo: TodolistService, public router: Router) {}

  ngOnInit(): void {}

  // appelle la methode addTask de notre service todolist, en lui fournissant une nouvelle tache construite à partir des inputs de notre formulaire, puis nous redirige vers le composant todolist.
  onSubmit(userform: NgForm): void {
    this.todo.addTask(new Task(userform.value.name, (userform.value.completed == 0) ? false : true, "new task", new Date));
    this.router.navigate(['todolist']);
  }
}
