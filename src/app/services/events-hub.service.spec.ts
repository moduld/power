/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventsHubService } from './events-hub.service';

describe('EventsHubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsHubService]
    });
  });

  it('should ...', inject([EventsHubService], (service: EventsHubService) => {
    expect(service).toBeTruthy();
  }));
});
