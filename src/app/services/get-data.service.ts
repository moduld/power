import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Folders } from '../interfaces/folders';

@Injectable()
export class GetDataService {

  constructor( private http: Http ) { }
  allFolders: Folders[];
  savingImagesTemp: any;

  getData(): any[] {
    this.allFolders = localStorage.getItem('allFolders') ? JSON.parse(localStorage.getItem('allFolders')) : <any>[];
    return this.allFolders
  }

  saveFolders(folders: any){
    this.allFolders = folders;
    localStorage.setItem('allFolders', JSON.stringify(folders))
  }

  saveImg(folder: any, subfolder: any){
    let nameArray = [];
    let count = subfolder ? this.allFolders[folder].subdir[subfolder].images.length : this.allFolders[folder].images.length;
    for (let i = 0; i < count; i++){
      subfolder ? nameArray.push(this.allFolders[folder].subdir[subfolder].images[i].name) : nameArray.push(this.allFolders[folder].images[i].name)
    }
    this.savingImagesTemp = this.savingImagesTemp.filter((item)=>{
      return nameArray.indexOf(item.name) < 0
    });

    if (subfolder){
      this.allFolders[folder].subdir[subfolder].images = this.allFolders[folder].subdir[subfolder].images.concat(this.savingImagesTemp)
    } else {
      this.allFolders[folder].images = this.allFolders[folder].images.concat(this.savingImagesTemp)
    }

    this.saveFolders(this.allFolders)
  }

}
