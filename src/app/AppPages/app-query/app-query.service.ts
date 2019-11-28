import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({ providedIn : "root"})
export class QueryService
{     

     constructor(private http:HttpClient,private authService:AuthService){}
     SubmitQuery(title: string,content: string)
     {      
           const queryModel = {email:this.authService.email,title:title,content:content}
           this.http.post<{message : string}>("http://localhost:3000/api/query",queryModel).subscribe(
                response => {
                     console.log(response);
                }
           );
     }

}