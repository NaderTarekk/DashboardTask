import { ParseSourceFile } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  Form!: FormGroup;
  notFound: boolean = false

  constructor(private fb: FormBuilder, private router: Router, private service: AuthService) {
    this.Form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    var getAdmin = JSON.parse(localStorage.getItem('Admin')!)
    if (getAdmin != null) {
      this.router.navigate(['/UsersList']);
    }
  }

  get AdminUsername() {
    return this.Form.get('username');
  }
  get AdminPassword() {
    return this.Form.get('password');
  }


  OnSubmit() {
    this.service.GetAdmin(this.AdminUsername?.value, this.AdminPassword?.value).subscribe((res: any) => {
      if (res.length != 0) {
        localStorage.setItem("Admin", JSON.stringify(this.Form.value))
        this.router.navigate(['/UsersList']);
      } else {
        this.notFound = true
      }
    })
  }
}