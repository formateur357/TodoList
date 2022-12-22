import { Component } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { User } from 'src/app/class/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatChipInputEvent } from '@angular/material/chips';

const medium = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))');
const strong = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  public userForm: UntypedFormGroup;
  public passwordStrength: any;

  public skills: string[];
  public separatorKeysCodes: number[] = [ENTER, COMMA];


  // Fonction statique afin de verifier que les deux champs password sont identiques. Retourne null s'il n'y a pas d'erreur et un objet contenant l'erreur sinon.
  public static checkPassword(group: UntypedFormGroup): any {
    console.log('check');
    return (group.get('password')?.value === group.get('confirmation')?.value) ? null : { matchingError: true };
  }

  constructor(public userService: UserService, public fb: UntypedFormBuilder) {
    this.skills = [];
    this.userForm = this.fb.group({
      userName: this.fb.control(
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
        [(control: AbstractControl) => this.isUsernameAvailable(control)]
      ),
      firstName: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      lastName: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      age: this.fb.control('', [Validators.required, Validators.min(65), Validators.max(99)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      passwordGroup: this.fb.group({
        password: this.fb.control('', [Validators.required]),
        confirmation: this.fb.control('', [Validators.required]),
      }, {
        validators: UserFormComponent.checkPassword,
        updateOn: 'blur'
      }),
      team: this.fb.control('', [Validators.required]),
      skillCtrl: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
    }, {
      updateOn: 'change'
    })

    this.passwordStrength = {};
    this.password?.valueChanges
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe(newValue => this.getPasswordStrength(newValue));

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

  public getPasswordStrength(value: string): void {
    this.passwordStrength.color = "red";
    this.passwordStrength.textContent = "weak";

    if(strong.test(value)) {
      this.passwordStrength.color = "green";
      this.passwordStrength.textContent = 'Strong';
    } else if(medium.test(value)) {
      this.passwordStrength.color = 'orange';
      this.passwordStrength.textContent = 'Medium';
    }
    console.log(this.passwordStrength);
   }

  public get userName(): AbstractControl | null {
    return this.userForm.get('userName');
  }

  public get firstName(): AbstractControl | null {
    return this.userForm.get('firstName');
  }

  public get lastName(): AbstractControl | null {
    return this.userForm.get('lastName');
  }

  public get age(): AbstractControl | null {
    return this.userForm.get('age');
  }

  public get email(): AbstractControl | null {
    return this.userForm.get('email');
  }

  public get passwordGroup(): any {
    return this.userForm.get('passwordGroup');
  }

  public get password(): AbstractControl | null {
    return this.userForm.get('passwordGroup.password');
  }

  public get confirmation(): AbstractControl | null {
    return this.userForm.get('passwordGroup.confirmation');
  }

  public get team(): AbstractControl | null {
    return this.userForm.get('team');
  }

  public get skillCtrl(): any {
    return this.userForm?.get('skillCtrl');
  }

  public isUsernameAvailable(control: AbstractControl | null): any {
    const name: string = control?.value;
    return this.userService.isUsernameAvailable(name);
  }

  public onSubmit(userForm: UntypedFormGroup): void {
    console.log(userForm);
    this.userService.addUser(
      new User(
        this.userName?.value,
        this.firstName?.value,
        this.lastName?.value,
        this.age?.value,
        this.email?.value,
        this.password?.value,
        this.team?.value,
        this.skills
      )
    )
  }

  trackByFunction(index: number, item: any): string {
    return item.id;
  }

  addSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our skill
    if (value) {
      this.skills.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.skillCtrl.setValue(null);
  }

  removeSkill(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }
}