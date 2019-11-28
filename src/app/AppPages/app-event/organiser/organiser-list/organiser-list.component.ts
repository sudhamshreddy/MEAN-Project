import { Component, OnInit, ViewChild } from '@angular/core';
import { Organiser } from '../organiser.model';
import { OrganiserService } from '../organiser.service';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-organiser-list',
  templateUrl: './organiser-list.component.html',
  styleUrls: ['./organiser-list.component.css']
})
export class OrganiserListComponent implements OnInit {
  
  organisers : Organiser[];
  @ViewChild("f",{static:false}) constraint : NgForm;
   event:string;
  
  constructor(private organiserservice : OrganiserService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    
    //console.log("ngonit called")
    this.route.params.subscribe( 
      (params:Params)=> {
          console.log("ngonit recalled");
          this.organiserservice.getOrganisers().subscribe();
    })

    this.organiserservice.getOrganisers().subscribe();
    this.organiserservice.organiserFetched.subscribe(
      (organisersArray: Organiser[])=>{
        this.organisers =  organisersArray;
        var temporaryorganisers:Organiser[] = [];
        const event = this.route.snapshot.params['event'];
         this.organisers.forEach(
          (x) => 
          {  
          //   console.log(x.events)
           //  console.log(event)
           //  console.log(x.events.includes(event))
             if(x.events.includes(event))
             {
               temporaryorganisers.push(x);
              
             }
          }
        )
        console.log(this.organisers); 
        this.organisers = temporaryorganisers;
          

      }
    )
   // console.log("init called"); 
   
     
  }
   

   onSearch()
   {
       const name = this.constraint.value['search'];
       const budget = +this.constraint.value['budget'];
       const size = +this.constraint.value['organisationsize'];
       var temporganisers = [];
       if(name)
       {   
        //  this.organisers = [];
          for(let i=0;i<this.organisers.length;i++)
              {
                 if(this.organisers[i]['name'] === name)
                 {
                    temporganisers.push(this.organisers[i]);
                    return;
                 }
              }
          console.log(temporganisers);
          this.organiserservice.organiserFetched.next(temporganisers);   
       }
       if(budget)
       {   
        //  this.organisers = [];
    
          for(let i=0;i<this.organisers.length;i++)
              {  
                console.log(this.organisers[i]['minimumbudget']);
                console.log(budget);
                console.log(this.organisers[i]['minimumbudget'] <= budget);
                 if(this.organisers[i]['minimumbudget'] <= budget)
                 { 
                   
                    console.log("pushed");
                    temporganisers.push(this.organisers[i]);
                    return;
                 }
              }
       //   console.log(temporganisers);
          this.organiserservice.organiserFetched.next(temporganisers);   
       }
        if(size)
        {   
              
            if(temporganisers.length === 0 && !budget)
            {
              temporganisers = this.organisers;
            }
            for(let i=0;i<temporganisers.length;i++)
            {  
              if(+temporganisers[i]['size'] > +size)
              {      
                    console.log(temporganisers[i]['size']);
                    console.log(size);
                    temporganisers.splice(i,1);
                  //  console.log(temporganisers);
              }
            }
         //   console.log(temporganisers);  
        }
   }
   onReset()
   {
    this.constraint.reset();
    const event = this.route.snapshot.params['event'];
    //console.log(event);
   // this.router.navigate(['event/organiser/',event]);
   this.organiserservice.getOrganisers().subscribe();
   }
   


}
