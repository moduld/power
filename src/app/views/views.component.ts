import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import { GetDataService } from '../services/get-data.service';
import { EventsHubService } from '../services/events-hub.service';

import { Folders } from '../interfaces/folders';

@Component({
  moduleId: 'module.id',
  selector: 'app-views',
  templateUrl: 'views.component.html',
  styleUrls: ['views.component.scss']
})
export class ViewsComponent implements OnInit, OnDestroy, AfterContentChecked {

  private id: number;
  private subfolder: number;

  private routeSubscription: Subscription;
  private querySubscription: Subscription;

  constructor(private route: ActivatedRoute, private getData: GetDataService, private eventsHub: EventsHubService) {
    this.routeSubscription = route.params.subscribe(params=>{
      this.id=params['id'];
      this.findCurrentFolder(this.id)
    });
    this.querySubscription = route.queryParams.subscribe(
        (queryParam: any) => {
          this.subfolder = queryParam['subfolder'];
          this.findCurrentSubfolder(this.subfolder)
        }
    );
  }

  currentFolder: Folders;
  currentSubfolder: any;
  images: any[];
  deletingImgIndex: number;
  showPopUpFlag: boolean = false;
  clickedImg: any;
  sortType: string;
  imagesQuontity: number;

  ngOnInit() {
    this.eventsHub.saveImages().subscribe(() => {
      this.getData.saveImg(this.id, this.subfolder);
      this.fillImagess()
    });

    this.eventsHub.returnImagerAction().subscribe((flag) => {
      flag && this.deleteImage()
    });

    this.eventsHub.sortBy().subscribe((sett) => {
      this.sortType = sett
    });

    this.fillImagess()
  }

  ngAfterContentChecked(){
    if (this.imagesQuontity && this.imagesQuontity < this.images.length){
      this.sortType = 'date';
    }
    this.imagesQuontity = this.images.length;
  }

  fillImagess() {
    if (this.subfolder){
      this.images = this.getData.allFolders[this.id].subdir[this.subfolder].images
    } else {
      this.images = this.getData.allFolders[this.id].images
    }
    this.images.forEach((img)=>{
      img.disabled = true;
    });

  }

  findCurrentFolder(folder):void {
    this.currentFolder = this.getData.allFolders[folder];
    this.images = this.currentFolder.images;
  }

  findCurrentSubfolder(index):void {
    if (index) {
      this.currentSubfolder = this.currentFolder.subdir[index];
      if (this.currentSubfolder){
        this.images = this.currentSubfolder.images
      }
    } else {
      this.currentSubfolder = null;
      this.images = this.currentFolder.images
    }
  }

  callDelModal(index):void {
    this.deletingImgIndex = index;
    this.eventsHub.showImageDelModal();

  }

  deleteImage(): void {
    this.images.splice(this.deletingImgIndex, 1);
    this.saveContent()
  }

  dblClick(image):void {
    image.disabled = false;
  }


  saveContent(): void {
    this.images.forEach((img)=>{
      delete img.disabled;
    });
    this.getData.saveFolders(this.getData.allFolders)
    this.fillImagess()
  }

  showPopUpWindow(index): void {
    this.clickedImg = this.images[index].data;
    this.showPopUpFlag = true;
  }

  closePopUp(event):void {
    this.showPopUpFlag = false;
  }

  ngOnDestroy(){
    this.routeSubscription.unsubscribe();
    this.querySubscription.unsubscribe();
  }


}
