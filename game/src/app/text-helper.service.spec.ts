import { TestBed } from '@angular/core/testing';

import { TextHelperService } from './text-helper.service';

describe('TextHelperService', () => {
  let service: TextHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
