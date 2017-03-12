import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';

import { EventsHubService } from '../services/events-hub.service';
import { GetDataService } from '../services/get-data.service';

interface FileInfo {
  name:string;
  size: string;
  date:any;
  data: any;
  dimension: any;
}

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.scss']
})
export class ImageAddComponent implements OnInit{

  constructor(private eventsHub: EventsHubService, private getData: GetDataService) { }

  imagesArr: FileInfo[];
  result: string;

  ngOnInit() {
    this.imagesArr = [];
    this.eventsHub.showAddImgComponent().subscribe(() => {
      document.body.classList.add('with_modal');
      document.body.classList.add('add_img_modal');

    })
  }

  onChange(event, model){
    let files = event.target.files;

    for (let i = files.length; i--; this.readFiles(files[i])){}
    (<HTMLInputElement>document.getElementById("type_file_input")).value = ''
  }

  readFiles(file:any): void {
    let fileReader: FileReader = new FileReader();
    if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif") {
      file.size < 3145728 && fileReader.addEventListener('loadend', readIt);
    }
    let self = this;
      function  readIt (event) {
        let tempImg = document.createElement("img");
        tempImg.src = event.target.result;
        self.imagesArr.push({
          name: file.name,
          size: file.size,
          date: new Date(),
          data: event.target.result,
          dimension: 'H:' + tempImg.height + ' / W: ' + tempImg.width
        });
      }
      fileReader.readAsDataURL(file)

  }

  deleteImg(index){
    this.imagesArr.splice(index, 1)
  }

  cancelAddImg(){
    document.body.classList.remove('with_modal');
    document.body.classList.remove('add_img_modal');
    this.imagesArr = [];
  }

  makeAddFiles(){
    this.getData.savingImagesTemp = this.imagesArr;
    this.eventsHub.saveImages();
    this.cancelAddImg()
  }
}
