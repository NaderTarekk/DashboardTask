import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../Service/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  Form!: FormGroup
  userCreated: boolean = false
  userCreatedStatus: string = "success"
  userCreatedWord: string = "Created Successfully ✅"
  btnWord: string = "Create"
  id: any

  constructor(private fb: FormBuilder, private service: UsersService, private router: Router, private AR: ActivatedRoute) {
    this.id = AR.snapshot.paramMap.get('id')
    // in case updating
    if (this.id != 0) {
      this.btnWord = "Update"
      service.GetUser(this.id).subscribe((res: any) => {
        this.Form.patchValue(res)
      })
    }

    this.Form = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      isActive: false,
    })
  }

  get Name() {
    return this.Form.get('name');
  }
  get Email() {
    return this.Form.get('email');
  }

  OnCreate() {
    // in case creating
    if (this.id == 0) {
      this.service.CreateUser(this.Form.value).subscribe(res => {
        this.userCreated = true
        setTimeout(() => {
          this.router.navigate(['/UsersList'])
        }, 2000);
      }, err => {
        this.userCreated = true
        this.userCreatedWord = "Error Updating User"
        this.userCreatedStatus = "danger"
        console.log(err.message);
      })
    } 
    // in case updating
    else {
      this.service.EditUser(this.Form.value, this.id).subscribe(res => {
        this.userCreated = true
        this.userCreatedWord = "Updated Successfully ✅"
        setTimeout(() => {
          this.router.navigate(['/UsersList'])
        }, 2000);
      }, err => {
        this.userCreated = true
        this.userCreatedWord = "Error Updating User"
        this.userCreatedStatus = "danger"
        console.log(err.message);
      })
    }
  }
}
