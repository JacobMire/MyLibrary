import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
showSpinner: any;
    constructor(private router: Router, public authService: AuthService) { }
      
      ngOnInit() {
      }
    
      onLogin(form: NgForm) {

        if (form.invalid) {
          return;
        }
        this.authService.login(form.value.email, form.value.password)

      }

      

}
