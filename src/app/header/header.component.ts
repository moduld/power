import { Component, OnInit } from '@angular/core';

import { EventsHubService } from '../services/events-hub.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private eventsHub: EventsHubService) { }

  ngOnInit() {
  }

  showAddImgModal() {
    this.eventsHub.showAddImgComponent()
  }

  filterBy(sort):void {
    this.eventsHub.sortBy(sort)
  }
}
