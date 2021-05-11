import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Slayer } from '../../shared';

@Component({
  selector: 'app-slayer',
  templateUrl: './slayer.component.html',
  styleUrls: ['./slayer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlayerComponent {
  @Input() slayer: Slayer | null;

  constructor() {
    this.slayer = null;
  }
}
