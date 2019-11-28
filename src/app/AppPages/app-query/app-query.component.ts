import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QueryService } from './app-query.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-app-query',
  templateUrl: './app-query.component.html',
  styleUrls: ['./app-query.component.css'],
  providers: [QueryService]

})
export class AppQueryComponent implements OnInit {
value:string;
content:string;

Submitted = false;
@ViewChild('f',{static:false}) f:NgForm;
  constructor(private queryService:QueryService,private authService:AuthService) { }

  ngOnInit() {
   // this.value = this.f.value["type"];
   
  }

  onSubmit()
  {
   // console.log(this.f);
   this.value = this.f.value['type'];
   this.content = this.f.value['text'];
   this.queryService.SubmitQuery(this.value,this.content);
   console.log(this.value+this.content);
   this.Submitted = true;
   this.f.reset();
  }

}
