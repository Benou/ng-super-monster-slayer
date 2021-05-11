import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { BattleLog } from '../../shared';

@Component({
  selector: 'app-battle-logs',
  templateUrl: './battle-logs.component.html',
  styleUrls: ['./battle-logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattleLogsComponent {
  @Input() logs: BattleLog[] | null;

  constructor() {
    this.logs = null;
  }
}
