import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

  constructor(public authService: AuthService ){}

    onCreateUser(form: NgForm) {
      try{
      console.log(form.value)
      if(form.invalid){
        return
      }
      this.authService.createUser(form.value.name,form.value.email,form.value.password,form.value.radio,)

    }catch(err){
      console.log(err)
    }
  }


}
