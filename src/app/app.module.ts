import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FoldersComponent } from './folders/folders.component';
import { ViewsComponent } from './views/views.component';

import { GetDataService } from './services/get-data.service';
import { EventsHubService } from './services/events-hub.service';
import { ModalComponent } from './modalFolderDel/modal.component';
import { ImageAddComponent } from './image-add/image-add.component';
import { HeaderComponent } from './header/header.component';
import { ModalImageDelComponent } from './modal-image-del/modal-image-del.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { SortByPipe } from './pipes/sort-by.pipe';

import {Ng2PaginationModule} from 'ng2-pagination';

let routes: Routes = [
  {path: 'folder/:id', component: ViewsComponent},
  {path: '', redirectTo: 'folder/0', pathMatch: 'full'}

];


@NgModule({
  declarations: [
    AppComponent,
    FoldersComponent,
    ViewsComponent,
    ModalComponent,
    ImageAddComponent,
    HeaderComponent,
    ModalImageDelComponent,
    PopUpComponent,
    SortByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    Ng2PaginationModule
  ],
  providers: [GetDataService, EventsHubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
