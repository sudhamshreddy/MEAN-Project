import { Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';

@Injectable({ providedIn : "root"})

export class AuthService{
   private token:string;
   private tokenTimer:any;
   private isAuthenticated = false;
   private isAdmin:boolean = true;
   private authStatusListener = new Subject<boolean>();
   private adminStatusListener = new Subject<boolean>();
   public email = '';
   public name = '';
   
    constructor(private http:HttpClient,private router:Router){}

    createUser(name:string,email:string,mobile:number,password:string)
    {   
        const authData : AuthData = {name:name,email:email,mobile:mobile,password:password};
        this.http.post("http://localhost:3000/api/user/signup",authData).subscribe(
            (response)=>
            {
               this.router.navigate(["/login"]);
            }
        )
    }
    getName()
    {   
       
       this.http.get<{name:string}>("http://localhost:3000/api/user/"+this.email ).subscribe(
           response => {
           // console.log(response);
               this.name = response.name;
          //     console.log(this.name);
           }
       )
       
    }

    getToken(){return this.token;}

    getIsAuth()
    {   
        //console.log(this.isAuthenticated);
        return this.isAuthenticated;
    }

    getIsAdmin()
    {
        return this.isAdmin;
    }
    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }

    login(email:string,password:string)
    {    
        this.clearAuthData();
        this.isAdmin = false;
        const authData : AuthData = {email:email,password:password};
        if(email === "admin@gmail.com" && password === "admin")
        {  
         //   console.log("status changed");
            this.isAdmin = true;
        }
        this.http.post<{token:string,expiresIn: number,isAdmin : boolean}>("http://localhost:3000/api/user/login",authData).subscribe(
            (response)=>
            {   console.log(response);
                const token = response.token;
                this.token = token;
                // const  adminstatus = response.isAdmin;
                if(token){
                const expiresInDuration = response.expiresIn;
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;
                // this.isAdmin = response.isAdmin;
                //  console.log(response.isAdmin);
                // console.log(response.isAdmin);
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime()+expiresInDuration*1000);
               // console.log(expirationDate);
                this.saveAuthData(token,expirationDate);
              //  console.log("email called");
                this.email = authData.email;
               // console.log(this.email);
              //  this.getName();
                this.router.navigate(["/home"]);
                         }
            }
        )
    }
    autoAuthUser()
    {
       const authInfo = this.getAuthData();
       if(!authInfo)
       {
           return;
       }
       const now = new Date();
       const expiresIn = authInfo.expirationDate.getTime()-now.getTime();
       if(expiresIn > 0)
       {
           this.token = authInfo.token;
           this.isAuthenticated = true;
           this.setAuthTimer(expiresIn/1000);
           this.authStatusListener.next(true);
       }
    }
    logout()
    {   
        this.token = null;
        this.isAuthenticated = false;
        this.isAdmin = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(["/login"]);
    }
    private setAuthTimer(duration : number)
    {   
        console.log("setting timer: "+duration);
        this.tokenTimer= setTimeout(()=>{
            this.logout();
          },duration*1000)
    }
     

    private saveAuthData(token:string,expirationDate: Date)
    {
        localStorage.setItem('token',token);
        localStorage.setItem('expiration',expirationDate.toISOString());
       
    }
    private clearAuthData()
    {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');

    }
    private getAuthData()
    {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        
        if(!token || expirationDate)
        {
            return;
        }
         
        return{
            token : token,
            expirationDate: new Date(expirationDate)
        }
    }
    UpdateDetails(email:string,name:string,password:string,mobile:number)
    {     
        console.log("method called");
        console.log(email);
        const user = new User(name,email,mobile,password);
        this.http.put<{message:string}>("http://localhost:3000/api/user",user).subscribe(
            response => {
                console.log(response);
            }
        )
    }
}