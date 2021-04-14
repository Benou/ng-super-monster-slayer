import { TestBed } from '@angular/core/testing';

import { MonsterSlayerComponent } from './monster-slayer.component';

describe('MonsterSlayerComponent', () => {
  let component: MonsterSlayerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonsterSlayerComponent]
    });

    component = TestBed.inject(MonsterSlayerComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
