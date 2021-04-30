import { Component, Input } from '@angular/core';
import { BattleLog } from '../../shared/models/battle-log.interface';

@Component({
  selector: 'app-battle-logs',
  templateUrl: './battle-logs.component.html',
  styleUrls: ['./battle-logs.component.scss']
})
export class BattleLogsComponent {
  @Input() items: BattleLog[] | null;

  constructor() {
    this.items = null;
  }
}
