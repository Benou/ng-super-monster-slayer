import { TestBed } from '@angular/core/testing';

import { SlayerActionsComponent } from './slayer-actions.component';

describe('SlayerActionsComponent', () => {
  let component: SlayerActionsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlayerActionsComponent]
    });

    component = TestBed.inject(SlayerActionsComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
