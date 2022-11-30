import { Injectable } from '@angular/core';
import { Task } from '../class/task.model';

const initialList: Task[] = [
  new Task(1, "Chauffer le dancefloor", true, "Danser le woogie.", new Date()),
  new Task(2, "Partir au Hesscape Game", false, "Comment tu t'en sortiras?", new Date(Date.now())),
  new Task(3, "Apportez des cookies à momie.", true, "Miam des doigts...", new Date("01/01/2020 09:00"))
];

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  public tasks: Task[];

  constructor() {
    this.tasks = initialList;
  }
}
