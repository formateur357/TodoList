import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../class/task.model';

// constante contenant notre liste de taches initiales.
const initialList: Task[] = [
  new Task("Chauffer le dancefloor", true, "Danser le woogie.", new Date()),
  new Task("Partir au Hesscape Game", false, "Comment tu t'en sortiras?", new Date(Date.now())),
  new Task("Apportez des cookies à momie.", true, "Miam des doigts...", new Date("01/01/2020 09:00"))
];

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  // propriete contenant la liste de taches.
  private tasks: Task[];

  // propriete contenant le sujet (contient l'observable et l'observer, mais on s'en servira en tant qu'Observer cote service).
  private _tasks = new BehaviorSubject<Task[]>([]);

  // propriete contenant l'observable qu'on enverra aux composants voulant l'utiliser afin de s'abonner, via la methode getTasks de notre service.
  readonly tasks$ = this._tasks.asObservable();

  // propriete contenant le message renvoye par la promise.
  public prom!: Promise<string>;

  // Dans le constructor on initialise notre liste de taches d'abord en tant que liste vide puis dans le callback de notre promise on assigne initialList à notre liste de taches, puis on emet la liste de taches dans le flux de l'observable grace a la methode emiter de notre service.
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

  // methode qui renvoie l'observable aux composants souhaitant l'utiliser afin de s'abonner au flux.
  public getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  // methode pour emettre une donnee dans le flux
  private emiter(tasks: Task[]): void {

    // on utilise la methode next des observer qui nous permet d'envoyer une copie profonde de notre liste de taches dans le flux de l'observable.
    this._tasks.next(Object.assign([], tasks));
  }

  // methode afin de mettre a jour la propriete completed de la tache a l'id fournit en parametres. On oublie pas d'emettre le changement dans le flux grace a notre methode emiter.
  public toggleComplete(id: number) {
    this.tasks[id].completed = !this.tasks[id].completed;
    this.emiter(this.tasks);
  }


  // renvoie une tache en fonction de l'id fournit en parametres.
  public getTaskById(id: number): Task | null {
    // for (const task of this.tasks) {
    //   if (task.id == id)
    //     return task;
    // }
    // return null;
    return this.tasks.filter(task => task.id == id)[0];
  }
}
