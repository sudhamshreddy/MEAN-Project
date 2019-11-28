import { Component, Input, OnInit, OnDestroy} from '@angular/core';
import { User } from '../shared/user.model';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  
  user:User;
  isAdmin = false;
  private authListenerSubs:Subscription;
  userIsAuthenticated = false;
  public name:string;
  constructor(private authService:AuthService){}
  
  ngOnInit()
  { 

    this.userIsAuthenticated = this.authService.getIsAuth();
   this.isAdmin = this.authService.getIsAdmin();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(
      isAuthenticated=>{
        this.userIsAuthenticated = isAuthenticated;
       this.isAdmin = this.authService.getIsAdmin();
     //  console.log(this.isAdmin);
       // this.authService.getName();
         
      }
    );
  }

  getName()
  {
     
  }
  onLogout()
  {
     this.authService.logout();
  }

  ngOnDestroy()
  {
      this.authListenerSubs.unsubscribe();
  }

}
