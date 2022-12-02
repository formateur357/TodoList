import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'todolist/:id', component: TaskDetailsComponent},
  {path: 'todolist', component: TodoListComponent},
  {path: '404', component: NotFoundComponent},
  {path: '', component: TodoListComponent, pathMatch: 'full'},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*, {enableTracing: true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
