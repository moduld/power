import { Component, OnInit } from '@angular/core';

import { GetDataService } from '../services/get-data.service';
import { EventsHubService } from '../services/events-hub.service';

import { Folders } from '../interfaces/folders';


@Component({
  moduleId: 'module.id',
  selector: 'app-folders',
  templateUrl: 'folders.component.html',
  styleUrls: ['folders.component.scss']
})
export class FoldersComponent implements OnInit {

  constructor(private getData: GetDataService, private eventsHub: EventsHubService) { }


  folders: Folders[];
  newFolderWindow: boolean;
  newFolderName: string;
  clickFlag: boolean;
  deletedObject: any;

  ngOnInit() {
    this.newFolderWindow = true;
    this.folders = this.getData.getData();
    this.folders.length && this.addProperties(this.folders);

    this.clickFlag = true;

    this.eventsHub.returnFolderAction().subscribe((flag) => {
      flag && this.makeFolderDeletion()
    })
  }

  addProperties(data:Folders[]):any {
    data.forEach((item, i)=>{
      item.disabled = true;
      item.opened = false;
      i === 0 ? item.opened = true : '';
    });
    return data
  }

  closeNewFolderAdd():void {
    this.newFolderWindow = true;
    this.newFolderName = null;
  }

  addNewFolder(name: string):void {

    if (name.trim().length) {
      let pushedFolder = new Folders(name, [], []);
      pushedFolder.name = name;
      this.folders.push(pushedFolder);
      this.addProperties(this.folders)
      this.closeNewFolderAdd();
      this.saveToLocalStorage();
    }

  }

  dblClick(folder: any):void {
    this.clickFlag = false;
    folder.disabled = false;
  }

  oneTimeClick(folder:any):void {
    setTimeout(()=>{
       this.clickFlag ? folder.opened = !folder.opened : '';
    }, 500)
  }

  saveNewName(folder:any):void {
    console.log(folder)
    folder.disabled = true;
    this.clickFlag = true;
    this.saveToLocalStorage()
  }

  addNewSubfolder(folder) {
    if (folder.newSubdir && folder.newSubdir.trim().length){
      folder.subdir.push({name: folder.newSubdir, images: []})
      delete folder.newSubdir;
      this.saveToLocalStorage()
    }
  }

  deleteFolder(folder: any, index: number, trigger:boolean) {
    this.eventsHub.showModal();
    this.deletedObject = {folder: folder, index: index, trigger: trigger};
  }

  makeFolderDeletion() {
   if (this.deletedObject){
     this.deletedObject.trigger ? this.folders.splice(this.deletedObject.index, 1) : this.deletedObject.folder.subdir.splice(this.deletedObject.index, 1)
     this.saveToLocalStorage()
   }
  }

  saveToLocalStorage(){
    let temp = JSON.parse(JSON.stringify(this.folders));
    temp = temp.map((item)=>{
      delete item.disabled;
      delete item.opened;
      return item
    })

    this.getData.saveFolders(temp)
  }

}
