import { TestBed } from '@angular/core/testing';

import { SlayerArenaComponent } from './slayer-arena.component';

describe('SlayerArenaComponent', () => {
  let component: SlayerArenaComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlayerArenaComponent]
    });

    component = TestBed.inject(SlayerArenaComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
