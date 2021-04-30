import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { MonsterSlayerComponent } from './monster-slayer.component';

describe('MonsterSlayerComponent', () => {
  let component: MonsterSlayerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MonsterSlayerComponent,
        provideMockStore({})
      ]
    });

    component = TestBed.inject(MonsterSlayerComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
