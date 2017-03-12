import { Component, OnInit } from '@angular/core';
import { EventsHubService } from '../services/events-hub.service';

@Component({
  selector: 'app-modal-image-del',
  templateUrl: './modal-image-del.component.html',
  styleUrls: ['./modal-image-del.component.scss']
})
export class ModalImageDelComponent implements OnInit {

  constructor(private eventService: EventsHubService) {}

  title:string;

  ngOnInit() {
    this.eventService.showImageDelModal().subscribe(() => {
      this.title = "Confirm image deleting";
      document.body.classList.add('with_modal');
      document.body.classList.add('confirm_delete_img')
    })
  }

  buttonHandle(flag:boolean) {
    this.eventService.imageAction(flag);
    document.body.classList.remove('with_modal');
    document.body.classList.remove('confirm_delete_img')
  }

}
