import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryService } from './queries.service';
import { QueryModel } from './query.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-app-queries',
  templateUrl: './app-queries.component.html',
  styleUrls: ['./app-queries.component.css']
})
export class AppQueriesComponent implements OnInit {
   
  replyMode:boolean = false;
  content = '';
  queries:QueryModel[] = []
  constructor(private queryService:QueryService) {}

  ngOnInit() {
    this.queryService.GetQuery();
    this.queryService.QueriesUpdated.subscribe(
      queriesArray => 
      {
        this.queries = queriesArray;
        console.log(this.queries);
      } 
    )
  }
  onReply(email:string)
  {
     this.queryService.PostReply(email,this.content);
     this.content = '';
  }

}
