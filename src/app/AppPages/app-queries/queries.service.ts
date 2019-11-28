import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QueryModel } from './query.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn:"root"})
export class QueryService
{    
    queries:QueryModel[] = [];
     QueriesUpdated = new Subject<QueryModel[]>();
     constructor(private http:HttpClient){}
   
    GetQuery()
    {
        this.http.get<[{query:QueryModel}]>("http://localhost:3000/api/query").subscribe(
            response => 
            {
                this.queries = response['query'];
                 console.log(this.queries);
                this.QueriesUpdated.next(this.queries);
            }
        )

    }
    PostReply(email:string,content:string)
    {
        this.http.post<{message:string}>("http://localhost:3000/api/mailer",{email,content}).subscribe(
            response => {
                console.log(response);
            }
        )
    }
}