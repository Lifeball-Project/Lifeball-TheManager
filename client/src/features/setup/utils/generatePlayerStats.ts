import { PlayerId } from '@/types/player/player-id';
import { baseStats } from '@/types/stats/base-stats';
import { PlayerStats } from '@/types/stats/stats-types';
import { Player } from '@/types/player/player';
import { Position } from '@/types/player/player-position';
import { Race } from '@/types/race/race-types';
import { statModifiersByRace } from '@/types/stats/race-modifiers';
import { PlayerTag } from '@/types/tag/tag-types';
import { statModifiersByTag } from '@/types/tag/tag-modifiers';

/**
 * 플레이어 생성 함수
 * @param id - ID
 * @param race - 종족
 * @param position - 포지션
 * @param tags - 플레이어 태그 (선택적)
 **/

export function generatePlayerStats(
  id: PlayerId,
  race: Race,
  position: Position,
  tags: PlayerTag[] = []
): Player {
  const raceMod = statModifiersByRace[race];
  const stats: PlayerStats = {
    speed:
      baseStats.speed +
      (raceMod.speed ?? 0) +
      tags.reduce((sum, tag) => sum + (statModifiersByTag[tag]?.speed ?? 0), 0),
    power:
      baseStats.power +
      (raceMod.power ?? 0) +
      tags.reduce((sum, tag) => sum + (statModifiersByTag[tag]?.power ?? 0), 0),
    contact:
      baseStats.contact +
      (raceMod.contact ?? 0) +
      tags.reduce((sum, tag) => sum + (statModifiersByTag[tag]?.contact ?? 0), 0),
    defense:
      baseStats.defense +
      (raceMod.defense ?? 0) +
      tags.reduce((sum, tag) => sum + (statModifiersByTag[tag]?.defense ?? 0), 0),
    pitching:
      (baseStats.pitching ?? 0) +
      (raceMod.pitching ?? 0) +
      tags.reduce((sum, tag) => sum + (statModifiersByTag[tag]?.pitching ?? 0), 0),
  };

  return { id, race, position, stats, tags };
}