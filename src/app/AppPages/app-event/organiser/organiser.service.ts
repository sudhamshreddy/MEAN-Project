import { Organiser } from './organiser.model';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class OrganiserService
{   
    //organiserSelected = new EventEmitter<Organiser>();
    public eventselector = new Subject<String>();
     
     eventSelected:string;
    constructor(private http:HttpClient,private router:Router){}
    
    
                                 
    organisers : Organiser[]  = [];
    
    organiserFetched = new Subject<Organiser[]>();
     
    public getEventSelector()
    {
        return this.eventselector.next(this.eventSelected);
    }
     public getOrganisers()
     {
        // return this.organisers.slice();
        return  this.http.get<[{Organisers:any}]>('http://localhost:3000/api/organisers')
         .pipe(map((res)=>{
                // console.log(res);
                 return res.map((organiser) => {
                     let tempevents = [];
                     if(organiser['engagamentevent'] === 1)
                     {
                         tempevents.push("engagement");
                     }
                     if(organiser['weddingevent'] === 1)
                     {
                        tempevents.push("wedding");
                     }
                     if(organiser['receptionevent'] === 1)
                     {
                        tempevents.push("reception");
                     }
                     if(organiser['corporatevent'] === 1)
                     {
                        tempevents.push("corporateevent");
                     }
                     if(organiser['birthdayevent'] === 1)
                     {
                        tempevents.push("birthday");
                     }
                     return {
                         id: organiser['id'],
                         name : organiser['name'],
                         description : organiser['description'],
                         imagePath : organiser['imagePath'],
                         websiteLink : organiser['websiteLink'],
                         location : organiser['location'],
                         minimumbudget : organiser['minimumbudget'],
                         events : tempevents,
                         size : organiser['size'],
                         email : organiser['email'],
                         rating : organiser['rating']
                     }
                 })
             }),
             
             tap(
                 (ResponseData)=>{
                    this.organisers = ResponseData;
                    // console.log("service called");
                    this.organiserFetched.next(this.organisers);
                 }
             )
             )
            //  .subscribe(
            //     (ResponseData)=>{
            //           this.organisers = ResponseData;
            //           console.log(ResponseData);
            //           this.organiserFetched.next(this.organisers);
            //     }
            // )
    
      //  return this.organisers;
     }
     public getOrganiser(index:number)
     {   
         var neworganiser:Organiser = null;
         this.organisers.forEach(
             (x)=>{
                 if( x.id === index)
                 {   
                     console.log(x.id);
                     neworganiser = x;
                 }
             }
         )
         return neworganiser;
     }
     public getOrganiserId(index:number)
     {    
         console.log("get organiser id "+index)
         return +this.organisers[index].id;
     }
     public AddOrganiser(neworganiser: Organiser)
     {      
           this.http.post<{message:string}>('http://localhost:3000/api/organisers',neworganiser).subscribe(
              (responseData)=>{
                // console.log(responseData.message);
                 this.organisers.push(neworganiser);
                 this.organiserFetched.next(this.organisers);
              }
           );
            console.log("Addorganisers called")
     }
     public UpdateOrganiser(updatedOrganiser:Organiser)
     {   
       //  console.log("http://localhost:3000/api/organisers/"+updatedOrganiser.id)
         this.http.put("http://localhost:3000/api/organisers/"+updatedOrganiser.id,updatedOrganiser).subscribe(
             (response)=>{
                 const neworganiser = [...this.organisers];
                 const  oldorganiserindex = neworganiser.findIndex(p => p.id === updatedOrganiser.id);
                 updatedOrganiser[oldorganiserindex] = updatedOrganiser;
                 console.log("organiser updated!!!");
                 this.organiserFetched.next([...this.organisers]);
                  this.router.navigate(["/home"])
             }
         )
     }
     public getOrganiserEdit(id:Number)
     {  
        // console.log({...this.organisers.find(p=> p.id === id)});
         return {...this.organisers.find(p=> p.id === id)}
     }
     public DeleteOrganiser(index:number,webindex:number)
     {
         this.http.delete("http://localhost:3000/api/organisers/"+index).subscribe(
             (response)=>{
                //console.log(response);
               const updatedOrganiser =  this.organisers.slice(webindex,1);
                this.organiserFetched.next([...updatedOrganiser]);
                this.router.navigate(["/home"])
             }
             
         )
     }
}