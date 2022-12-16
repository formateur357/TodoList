import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/class/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  public userForm: FormGroup;

  constructor(public userService: UserService, public fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      lastName: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      team: this.fb.control('', [Validators.required]),
      skills: this.fb.array([])
    })
    this.addSkill()

    // this.firstName = this.fb.control('',[Validators.required, Validators.minLength(4)]);
    // this.lastName = this.fb.control('',[Validators.required, Validators.minLength(4)]);
    // this.email = this.fb.control('',[Validators.required, Validators.email]);
    // this.team = this.fb.control('',[Validators.required]);
    // this.skills = this.fb.array([this.fb.control('',[Validators.required])]);

    // this.userForm = this.fb.group({
    //   firstName: this.firstName,
    //   lastName: this.lastName,
    //   email: this.email,
    //   team: this.team,
    //   skills: this.skills
    // })
  }

  public get firstName(): AbstractControl | null {
    return this.userForm.get('firstName');
  }

  public get lastName(): AbstractControl | null {
    return this.userForm.get('lastName');
  }

  public get email(): AbstractControl | null {
    return this.userForm.get('email');
  }

  public get team(): AbstractControl | null {
    return this.userForm.get('team');
  }

  public get skills(): any {
    return this.userForm?.get('skills');
  }

  public addSkill(): void {
    this.skills.push(this.fb.control('', [Validators.required, Validators.maxLength(80)]));
  }

  public removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  public onSubmit(userForm: FormGroup): void {
    console.log(userForm);
    this.userService.addUser(
      new User(
        this.firstName?.value,
        this.lastName?.value,
        this.email?.value,
        this.team?.value,
        this.skills.value
      )
    )
  }

  trackByFunction(index: number, item: any): string {
    return item.id;
  }

}
