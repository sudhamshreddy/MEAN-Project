import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Organiser } from 'src/app/AppPages/app-event/organiser/organiser.model';
import { Subject } from 'rxjs';
import { OrganiserService } from 'src/app/AppPages/app-event/organiser/organiser.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-organiser-edit',
  templateUrl: './organiser-edit.component.html',
  styleUrls: ['./organiser-edit.component.css'],
  
})
export class OrganiserEditComponent implements OnInit {
    
   @ViewChild('f',{static:false}) f:NgForm;
   Submitted:boolean = false;
   private mode = "create"
   organiser:Organiser;
   organiserid:number;
  constructor(private orgservice: OrganiserService,private route:ActivatedRoute) { }

  ngOnInit() {
        this.route.paramMap.subscribe(
              (parammap:ParamMap)=>{
                    if(parammap.has("id"))
                    {
                        this.mode="edit";
                        this.organiserid = +parammap.get('id');
                        console.log("organisereditcalled");
                        this.organiser = this.orgservice.getOrganiserEdit(this.organiserid);
                    }
                    else{
                        this.mode = "create";
                        this.organiserid = null;
                        this.organiser = null;
                    }
              }
        )
  }

  onSubmit()
  {  
  const name = this.f.value['organisername'];
  const imagepath = this.f.value['imagepath'];
  const email = this.f.value['email'];
  const minimumbudget = this.f.value['minimumbudget'];
  const organiserdescription = this.f.value['organiserdescription'];
  const organiserlocation = this.f.value['organiserlocation'];
  const organiserwebsite = this.f.value['organiserwebsite'];
  const organisersize = this.f.value['organisersize'];
  const events:string[] = [];
  if(this.f.value['engagement'] === true)
  {
        events.push('engagement');
  }
   if(this.f.value['marriage'] === true)
  {
        events.push('marriage');
  }
   if(this.f.value['reception'] === true)
  {
        events.push('reception');
  }
   if(this.f.value['birthday'] === true)
  {
        events.push('birthday');
  }
   if(this.f.value['corporateevents'] === true)
  {
        events.push('corporateevents');
  }
   
  
      if(this.mode === 'create')
      {
            const temporganiser = new Organiser(0,name,organiserdescription,imagepath,organiserwebsite,organiserlocation,minimumbudget,events,organisersize,email);
      this.Submitted = true;
      //console.log("onsubmited called");

    //   this.organiseredited.next(temporganiser);
         this.orgservice.AddOrganiser(temporganiser);
         this.f.reset();
       }
       else
       {    
            const temporganiser = new Organiser(this.organiser.id,name,organiserdescription,imagepath,organiserwebsite,organiserlocation,minimumbudget,events,organisersize,email);
            this.orgservice.UpdateOrganiser(temporganiser);
            
       }
  }
  onClear()
  {
    this.f.reset();
  }

}
