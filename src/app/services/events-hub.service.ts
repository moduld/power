import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';


@Injectable()
export class EventsHubService {

  constructor() { }
  private eventSubject: Subject<any> = new Subject<any>();
  private imageSubject: Subject<any> = new Subject<any>();
  private saveImgSubject: Subject<any> = new Subject<any>();
  private delImgSubject: Subject<any> = new Subject<any>();
  private delImgModalSubject: Subject<any> = new Subject<any>();
  private sortBySubject: Subject<any> = new Subject<any>();


  flag: boolean;

  showModal(): Observable<any> {
      this.eventSubject.next();
    return this.eventSubject.asObservable();
  }

  showImageDelModal(): Observable<any> {
    this.delImgModalSubject.next();
    return this.delImgModalSubject.asObservable();
  }

  folderAction(flag:boolean) {
    this.flag = flag;
    this.returnFolderAction()
  }

  imageAction(flag:boolean) {
    this.flag = flag;
    this.returnImagerAction()
  }

  returnFolderAction(): Observable<any> {
    this.eventSubject.next(this.flag);
    return this.eventSubject.asObservable();
  }

  returnImagerAction(): Observable<any> {
    this.delImgSubject.next(this.flag);
    return this.delImgSubject.asObservable();
  }

  showAddImgComponent(): Observable<any>{
    this.imageSubject.next();
    return this.imageSubject.asObservable();
  }

  saveImages(): Observable<any>{
    this.saveImgSubject.next();
    return this.saveImgSubject.asObservable();
  }

  sortBy(sort?): Observable<any>{
    sort ? this.sortBySubject.next(sort) : this.sortBySubject.next();
    return this.sortBySubject.asObservable();
  }

}
