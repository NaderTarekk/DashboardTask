import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  GetAllUsers() {
    return this.http.get("http://localhost:3000/Users")
  }

  CreateUser(user: any) {
    return this.http.post("http://localhost:3000/Users", user)
  }

  ChangeActivation(user: IUser) {
    if (user.isActive == true)
      user.isActive = false
    else
      user.isActive = true
    return this.http.put(`http://localhost:3000/Users/${user.id}`, user)
  }

  EditUser(user: IUser, id: number) {
    return this.http.put(`http://localhost:3000/Users/${id}`, user)
  }

  DeleteUser(id: number) {
    return this.http.delete(`http://localhost:3000/Users/${id}`)
  }

  GetUser(id: number) {
    return this.http.get(`http://localhost:3000/Users/${id}`)
  }
}
