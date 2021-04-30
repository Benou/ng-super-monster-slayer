import { Injectable } from '@angular/core';

import { BattleStatus, Hero, Slayer, SlayerAction, slayerActions, SlayerActionResult, SlayerActionType, SlayerType } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MonsterSlayerService {

  constructor() {}

  attack(slayer: Slayer, opponent: Slayer, special: boolean = false): SlayerActionResult {
    const damages = this.randomizeDamages(slayer, special);
    const opponentHealth = this.getHealthAfterDamages(opponent, damages);
    const actionType = special ? SlayerActionType.SPECIAL_ATTACK : SlayerActionType.ATTACK;
    return this.mapActionResult(actionType, slayer.type, opponent.type, opponentHealth, damages);
  }

  heal(hero: Hero): SlayerActionResult {
    const healing = this.randomizeHealing(hero);
    const heroHealth = this.getHealthAfterHealing(hero, healing);
    return this.mapActionResult(SlayerActionType.HEAL, hero.type, hero.type, heroHealth, healing);
  }

  mapActionResult(
    actionType: SlayerActionType,
    slayerType: SlayerType,
    targetType: SlayerType,
    targetHealth: Slayer['health'],
    value: number
  ): SlayerActionResult {
    return { actionType, slayerType, targetType, targetHealth, value, counterAttack: slayerType === SlayerType.HERO };
  }

  randomizeDamages(slayer: Slayer, power: boolean = false): number {
    return this.randomize(
      ...(power ? slayer.damages.map(value => value * 2) as [number, number] : slayer.damages)
    );
  }

  randomizeHealing(hero: Hero): number {
    return this.randomize(...hero.healing);
  }

  randomize(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getHealthAfterDamages(slayer: Slayer, damages: number): Slayer['health'] {
    return Math.max(0, slayer.health - damages);
  }

  getHealthAfterHealing(slayer: Slayer, healing: number): Slayer['health'] {
    return Math.min(slayer.health + healing, slayer.maxHealth);
  }

  getStatusFromSlayers(hero: Slayer, monster: Slayer): BattleStatus {
    const isHeroDead = hero.health <= 0;
    const isMonsterDead = monster.health <= 0;
    if (!isHeroDead && !isMonsterDead) {
      return BattleStatus.SLAYERING;
    }
    return isHeroDead && isMonsterDead ? BattleStatus.DRAW : isMonsterDead ? BattleStatus.VICTORY : BattleStatus.DEFEAT;
  }

  getActionsFromSlayer(hero: Hero): SlayerAction[] {
    return slayerActions.map((action: SlayerAction): SlayerAction =>
      action.type === SlayerActionType.SPECIAL_ATTACK ?
        { ...action, disabled: !hero.cooldown || hero.cooldown % hero.maxCooldown !== 0 } :
        { ...action }
    );
  }

  getCooldownAfterRound(hero: Hero): Hero['cooldown'] {
    return Math.min(hero.cooldown + 1, hero.maxCooldown);
  }
}
