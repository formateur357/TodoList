import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {path: 'userlist', component: UserListComponent},
      {path: 'userform', component: UserFormComponent},
      {path: 'todolist', component: TodoListComponent, pathMatch: 'full'},
      {path: 'todolist/:id', component: TaskDetailsComponent},
      {path: 'taskform', component: TaskFormComponent}
    ]
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*, {enableTracing: true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
