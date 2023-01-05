import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../class/task.model';

// constante contenant notre liste de taches initiales.
// const initialList: Task[] = [
//   new Task("Chauffer le dancefloor", true, "Danser le woogie.", new Date()),
//   new Task("Partir au Hesscape Game", false, "Comment tu t'en sortiras?", new Date(Date.now())),
//   new Task("Apportez des cookies à momie dans son sarcophage.", true, "Miam des doigts...", new Date("01/01/2020 09:00"))
// ];

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  // url de la bdd firebase
  private url: string = "https://todolist-85939-default-rtdb.europe-west1.firebasedatabase.app/";

  // propriete contenant la liste de taches.
  private tasks: Task[];

  // propriete contenant le sujet (contient l'observable et l'observer, mais on s'en servira en tant qu'Observer cote service).
  private _tasks = new BehaviorSubject<Task[]>([]);

  // propriete contenant l'observable qu'on enverra aux composants voulant l'utiliser afin de s'abonner, via la methode getTasks de notre service.
  readonly tasks$ = this._tasks.asObservable();

  // propriete contenant le message renvoye par la promise.
  // public prom!: Promise<string>;

  // Dans le constructor on initialise notre liste de taches d'abord en tant que liste vide puis dans le callback de notre promise on assigne initialList à notre liste de taches, puis on emet la liste de taches dans le flux de l'observable grace a la methode emiter de notre service.
  constructor(public http: HttpClient) {
    this.tasks = [];
    // this.prom = new Promise<string>((resolve) => {
    //   setTimeout(() => {
        // this.tasks = initialList;
        // this.emiter(this.tasks);
    //     resolve('fini');
    //   }, 1000)
    // })
  }

  public save(): void {
    this.http.put(this.url+"/task.json", this.tasks).subscribe();
  }

  public load(): void {
    this.http.get(this.url+"/task.json").subscribe(response => {
      this.tasks = response as Task[];
      this.emiter(this.tasks);
    });
  }

  // methode qui renvoie l'observable aux composants souhaitant l'utiliser afin de s'abonner au flux.
  public getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  // methode pour emettre une donnee dans le flux
  private emiter(tasks: Task[]): void {

    // on utilise la methode next des observer qui nous permet d'envoyer une copie profonde de notre liste de taches dans le flux de l'observable.
    this._tasks.next(Object.assign([], tasks));
    this.save();
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

  // ajoute une tache a notre liste de taches, puis emet le changement sur le flux de l'observable.
  public addTask(task: Task) {
    task.id = this.getLastId() + 1;
    this.tasks.push(task);
    this.emiter(this.tasks);
    this.save();
  }

  private getLastId() {
    return (Math.max(...this.tasks.map(task => task.id)));
  }

  removeTask(id: number) {
    this.tasks.forEach((task : Task, i: number) => {
      if (task.id === id) {
        this.tasks.splice(i, 1);
      }
      this.emiter(this.tasks);
      this.save();
    })
  }
}
