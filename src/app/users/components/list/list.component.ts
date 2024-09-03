import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../Service/users.service';
import { IUser } from '../../models/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  adminDetails: any
  Users: IUser[] = []
  isDeleted: boolean = false

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit(): void {
    this.adminDetails = JSON.parse(localStorage.getItem('Admin')!)
    this.service.GetAllUsers().subscribe((res: any) => {
      this.Users = res
    })

    var getAdmin = JSON.parse(localStorage.getItem('Admin')!)
    if (getAdmin == null) {
      this.router.navigate(['']);
    }
  }

  Logout() {
    if (window.confirm("Do you want to logout?")) {
      localStorage.clear()
      this.router.navigate([""])
    }
  }

  isActive(user: IUser) {
    this.service.ChangeActivation(user).subscribe()
  }

  isNotActive(user: IUser) {
    this.service.ChangeActivation(user).subscribe()
  }

  DeleteUser(id: number) {
    if (window.confirm("Are you sure?")) {
      this.service.DeleteUser(id).subscribe(res => {
        this.isDeleted = true
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      })
    }
  }
}
