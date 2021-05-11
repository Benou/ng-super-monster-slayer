import { TestBed } from '@angular/core/testing';

import { SlayerComponent } from './slayer.component';

describe('SlayerComponent', () => {
  let component: SlayerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlayerComponent]
    });

    component = TestBed.inject(SlayerComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
