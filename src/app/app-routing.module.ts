import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './auth/create-user/create-user.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './header/header.component';
import { GetBookComponent } from './books/get-book/get-book.component';
//import { AddBookComponent } from './books/add-book/add-book.component';

const routes: Routes = [
  { path: 'create', component: CreateUserComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'land', component: HeaderComponent },
  { path: 'books', component: GetBookComponent },

  // { path: 'admin', component : LoginComponent },
  // { path: 'guest', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
