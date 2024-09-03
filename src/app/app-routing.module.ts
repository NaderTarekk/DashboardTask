import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/Components/login/login.component';
import { ListComponent } from './users/components/list/list.component';
import { CreateComponent } from './users/components/create/create.component';
import { DetailsComponent } from './users/components/details/details.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "UsersList", component: ListComponent },
  { path: "CreateUser/:id", component: CreateComponent },
  { path: "UserDetails/:id", component: DetailsComponent },
  { path: "**", redirectTo: "UsersList", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
