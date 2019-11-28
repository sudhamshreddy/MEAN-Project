import { Component, OnInit, Input } from '@angular/core';
import { Organiser } from '../../organiser.model';
import { OrganiserService } from '../../organiser.service';

@Component({
  selector: 'app-organiser-info',
  templateUrl: './organiser-info.component.html',
  styleUrls: ['./organiser-info.component.css']
})
export class OrganiserInfoComponent implements OnInit {
  
  @Input() organiser:Organiser;
  @Input() index: number;

  constructor(private organiserservice: OrganiserService) { }

  ngOnInit() {
  }

  // onSelected()
  // {
  //         this.organiserservice.organiserSelected.emit(this.organiser);
  // }

}
