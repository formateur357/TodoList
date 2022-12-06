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

  // propriete recuperant la liste de taches, on l'assigne dans le callback de notre abonnement a l'observable.
  public tasks: Task[] = [];
  // propriete recuperant l'observable auquel on peut s'abonner cote composant.
  public tasks$!: Observable<Task[]>;
  // propriete qui contient notre abonnement, il nous servira a nous desabonner de l'observable a la destruction du composant
  public subscribe! : Subscription | undefined;

  // on injecte notre service todolist
  constructor(public todo: TodolistService) {}

  // hook qui se declenche juste apres la creation du composant
  ngOnInit(): void {
    // on recupere l'observable
    this.tasks$ = this.todo.getTasks();
    // on s'abonne a l'observable et on recupere la liste de taches
    this.getTasks();
  }

  // hook qui se declenche a la destruction du composant
  ngOnDestroy(): void {
    // on se desabonne de l'observable
    this.subscribe?.unsubscribe();
  }

  // getter pour recuperer le nombre de taches completees
  get nbTrue(): number {
    return (this.tasks?.length) ? this.tasks.filter((task) => task.completed).length : 0;
  }

  // getter pour recupere le nombre de taches
  get nbTasks(): number {
    return (this.tasks?.length) ? this.tasks.length : 0;
  }

  // getter pour recuperer le pourcentage de taches completees
  get percent(): number {
    return this.nbTasks != 0 ? (this.nbTrue / this.nbTasks * 100) : 0;
  }

  // getter pour recuperer la couleur du pourcentage
  get textColor(): string {
    return this.percent > 50 ? 'green' : 'red';
  }

  // methode pour renvoyer true ou false en fonction du nombre de taches
  public isBold(): boolean {
    return this.tasks?.length > 0 ? true : false;
  }

  // methode pour s'abonner a l'observable et pour y associer un callback qui se declenchera à chaque nouvelle donnee envoyee dans le flux de l'observable.
  getTasks(): void {
    this.subscribe = this.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  // fonction trackBy afin de ne recharger que les elements concernes lors d'une modification ayant lieu sur la liste associee au ngFor.
  trackByFunction(index: number, item: any): string {
    return item.id;
  }

}
