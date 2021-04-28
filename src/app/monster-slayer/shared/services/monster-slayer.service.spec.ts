import { TestBed } from '@angular/core/testing';

import { MonsterSlayerService } from './monster-slayer.service';

describe('MonsterSlayerService', () => {
  let service: MonsterSlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonsterSlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
