import { Component, OnInit, OnDestroy } from '@angular/core';
import { Organiser } from '../organiser.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrganiserService } from '../organiser.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-organiser-detail',
  templateUrl: './organiser-detail.component.html',
  styleUrls: ['./organiser-detail.component.css']
})
export class OrganiserDetailComponent implements OnInit,OnDestroy {
  
    organiser:Organiser;
   id : number;
   private authStatusSub: Subscription;
   userIsAuthenticated = false;
   isAdmin = false;
   ratingmode = true;

  constructor(private router:Router,
              private route:ActivatedRoute,
              private orgservice:OrganiserService,
              private authService:AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) =>
      {
          this.id = +params['id'];
          console.log(this.id);
          this.organiser = this.orgservice.getOrganiser(this.id);
      }
    );
   this.authStatusSub =  this.authService.getAuthStatusListener().subscribe(
     isAuthenticated => {
       this.userIsAuthenticated = isAuthenticated;
     }
   )
   this.isAdmin = this.authService.getIsAdmin();
  }
  onDelete()
  {     
    console.log(this.id)
      const index = +this.route.snapshot.params['id'];
     // const id = this.orgservice.getOrganiserId(index);
       this.orgservice.DeleteOrganiser(this.id,index);
     //  window.location.reload();
  }
  ngOnDestroy()
  {
    this.authStatusSub.unsubscribe();
  }
  onRate(event : any)
  {  
     const rating = event.newValue;
     this.ratingmode = false;
     console.log(rating);
  }

}
