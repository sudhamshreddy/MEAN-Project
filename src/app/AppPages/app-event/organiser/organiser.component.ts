import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { OrganiserService } from './organiser.service';
import { Organiser } from './organiser.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-organiser',
  templateUrl: './organiser.component.html',
  styleUrls: ['./organiser.component.css'],
   
})
export class OrganiserComponent implements OnInit {
  
 
  
   
  constructor(private organiserservice:OrganiserService,
               private route:ActivatedRoute
    ) { }

  ngOnInit() {
    // this.organiserservice.organiserSelected.subscribe(
    //   (organiser: Organiser) => {this.selectedOrganiser = organiser;}
    // )
    const event = this.route.snapshot.params["event"];
    this.organiserservice.eventSelected = event;
    console.log(this.organiserservice.eventSelected);
    
  }
  onSubmit()
  {
      //  this.eventdetails = {

      // event : this.route.snapshot.params["event"],
      // rating : this.constraint.value.rating,
      // budget : this.constraint.value.budget,
      // organisationsize:this.constraint.value.organisationsize,
      // location : this.constraint.value.location
      //                       }
      
      //background work
    
       //   console.log(this.eventdetails);
  }
 

}
