import { Injectable } from '@angular/core';

import { BattleStatus, Slayer, SlayerAction, SlayerActionType } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MonsterSlayerService {

  constructor() {}

  getSlayerActions(): SlayerAction[] {
    return [
      {
        type: SlayerActionType.ATTACK,
        disabled: false
      },
      {
        type: SlayerActionType.SPECIAL_ATTACK,
        disabled: false
      },
      {
        type: SlayerActionType.HEAL,
        disabled: false
      },
      {
        type: SlayerActionType.SURRENDER,
        disabled: false
      }
    ];
  }

  attack(slayer: Slayer, opponent: Slayer, special: boolean = false): [number, number] {
    const damages = this.randomizeDamages(slayer, special);
    const health = this.adjustHealth(opponent, -1 * damages);
    return [damages, health];
  }

  specialAttack(slayer: Slayer, opponent: Slayer): [number, number] {
    return this.attack(slayer, opponent, true);
  }

  heal(slayer: Slayer): [number, number] {
    const healing = this.randomizeHealing(slayer as Required<Slayer>);
    const health = this.adjustHealth(slayer, healing);
    return [healing, health];
  }

  randomizeDamages(slayer: Slayer, special: boolean = false): number {
    return this.randomize(
      ...(special ? slayer.damages.map(value => value * 2) as [number, number] : slayer.damages)
    );
  }

  randomizeHealing(slayer: Required<Slayer>): number {
    return this.randomize(...slayer.healing);
  }

  randomize(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  adjustHealth(slayer: Slayer, delta: number): number {
    return Math.max(0, Math.min(slayer.health + delta, slayer.maxHealth));
  }

  adjustCooldown(slayer: Required<Slayer>, delta: number = 1): number {
    return Math.max(0, Math.min(slayer.cooldown + delta, slayer.maxCooldown));
  }

  getStatusFromSlayers(hero: Slayer, monster: Slayer): BattleStatus {
    const isHeroDead = hero.health <= 0;
    const isMonsterDead = monster.health <= 0;
    if (!isHeroDead && !isMonsterDead) {
      return BattleStatus.SLAYERING;
    }
    return isHeroDead && isMonsterDead ? BattleStatus.DRAW : isMonsterDead ? BattleStatus.VICTORY : BattleStatus.DEFEAT;
  }

  hasCooldown(slayer: Slayer): boolean {
    return slayer.cooldown !== undefined;
  }

  isCooldownFinished(slayer: Required<Slayer>): boolean {
    return slayer.cooldown === slayer.maxCooldown;
  }

  isWaitingForCooldown(slayer: Slayer): boolean {
    return this.hasCooldown(slayer) && !this.isCooldownFinished(slayer as Required<Slayer>);
  }
}
