import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { SlayerAction, SlayerActionType } from '../../shared';

@Component({
  selector: 'app-slayer-actions',
  templateUrl: './slayer-actions.component.html',
  styleUrls: ['./slayer-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlayerActionsComponent {
  @Input() items: SlayerAction[] | null;
  @Output() action: EventEmitter<SlayerActionType>;

  constructor() {
    this.items = null;
    this.action = new EventEmitter<SlayerActionType>();
  }

  emitAction(type: SlayerActionType): void {
    this.action.emit(type);
  }

  trackActions(index: number, item: SlayerAction): SlayerAction['type'] {
    return item.type;
  }
}
