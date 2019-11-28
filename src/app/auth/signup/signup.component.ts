import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authservice:AuthService) { }

  ngOnInit() {
   
    console.log("called");
  }
  onSignUp(form:NgForm)
  {
     if(form.invalid)
     {
       return;
     }
     console.log("sign up called")
     this.authservice.createUser(form.value.name,form.value.email,form.value.mobile,form.value.password);
  }
}
