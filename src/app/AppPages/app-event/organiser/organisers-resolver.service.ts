// import { Organiser } from './organiser.model';
// import { Injectable } from '@angular/core';
// import { OrganiserService } from './organiser.service';
import { Resolve,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Organiser } from './organiser.model';
import { OrganiserService } from './organiser.service';

@Injectable({providedIn:'root'})
export class OrganisersResolverService implements Resolve<Organiser[]>{

   constructor(private organiserService:OrganiserService){}

   resolve(route:ActivatedRouteSnapshot,state: RouterStateSnapshot)
   {    
       if(this.organiserService.organisers.length > 0)
             return this.organiserService.organisers;
       // return this.organiserService.getOrganisers();
   }
}