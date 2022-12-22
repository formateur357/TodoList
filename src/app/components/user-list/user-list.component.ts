import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/class/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  public users!: User[];
  public users$!: Observable<User[]>;
  public subscription!: Subscription;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers$();
    this.getUsers();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  public getUsers(): void {
    this.subscription = this.users$.subscribe(
      (users) => {
        this.users = users;
      });
  }

  trackByFunction(item: any): string {
    return item.id;
  }

}