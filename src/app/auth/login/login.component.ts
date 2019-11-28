import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 

  constructor(public authservice:AuthService) { }

  ngOnInit() {
    this.authservice.logout();
  }
  onLogin(form: NgForm)
  {  
    if(form.invalid)
    {
      return;
    }
     this.authservice.login(form.value.email,form.value.password);
  }

}
