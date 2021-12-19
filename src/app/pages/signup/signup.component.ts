import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.sevice';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userForm: any;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pseudo: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9 -'_]{2,20}/)]],
      pass: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9 -_]{4,20}/)]]
    })
  }

  onSubmit() {
    this.userService.signup(this.userForm.value).subscribe(
      res => this.router.navigate(['/chat-box']),
      error => console.error('inscription échoué!', error)
    );
  }

}
