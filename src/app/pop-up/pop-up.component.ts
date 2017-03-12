import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit, OnDestroy {

  constructor() { }
  @Input() image: any;
  @Output() closePopUp = new EventEmitter<boolean>();
  ngOnInit() {
    document.body.classList.add('with_modal');
  }

  ngOnDestroy() {
    document.body.classList.remove('with_modal');
  }

  closeWindow():void {
    this.closePopUp.emit(true)
  }

}
