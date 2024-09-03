import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../Service/users.service';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  id: any
  user!: IUser

  constructor(private AR: ActivatedRoute, private service: UsersService) {
    this.id = AR.snapshot.paramMap.get('id')
    service.GetUser(this.id).subscribe((res: any) => {
      this.user = res
    })
  }
}
