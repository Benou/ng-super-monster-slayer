import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Slayer } from '../../shared';

@Component({
  selector: 'app-slayer-arena',
  templateUrl: './slayer-arena.component.html',
  styleUrls: ['./slayer-arena.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlayerArenaComponent {
  @Input() slayers: Slayer[] | null;

  constructor() {
    this.slayers = null;
  }
}
