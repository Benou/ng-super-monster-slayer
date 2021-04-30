import { TestBed } from '@angular/core/testing';

import { BattleLogsComponent } from './battle-logs.component';

describe('BattleLogsComponent', () => {
  let component: BattleLogsComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [BattleLogsComponent]
    });

    component = TestBed.inject(BattleLogsComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
