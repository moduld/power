/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImageAddComponent } from './image-add.component';

describe('ImageAddComponent', () => {
  let component: ImageAddComponent;
  let fixture: ComponentFixture<ImageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
