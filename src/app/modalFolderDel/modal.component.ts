import { Component, OnInit } from '@angular/core';

import { EventsHubService } from '../services/events-hub.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  constructor(private eventService: EventsHubService) {}

  title:string;

  ngOnInit() {
    this.eventService.showModal().subscribe(() => {
      this.title = "Confirm deleting";
      document.body.classList.add('with_modal');
      document.body.classList.add('confirm_modal')
    })
  }

  buttonHandle(flag:boolean) {
    this.eventService.folderAction(flag);
    document.body.classList.remove('with_modal');
    document.body.classList.remove('confirm_modal')
  }

}
