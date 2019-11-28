import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css'],
  providers :[]
})
export class UsereditComponent implements OnInit {
  
  @ViewChild('f',{static:false}) f:NgForm;
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  onCancel()
  {
    this.f.reset();
  }

  onSubmit()
  {  
    console.log("method1 called");
     
     const email = this.authService.email;
     const name = this.f.value['name'];
     const password = this.f.value['password'];
     const mobile = +this.f.value['mobile'];
     this.authService.UpdateDetails(email,name,password,mobile);
  }

}
