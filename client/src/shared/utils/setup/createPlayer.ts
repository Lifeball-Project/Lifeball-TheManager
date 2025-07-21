import { baseStats, statModifiersByRace, statModifiersByTag, Player, Position, Race, PlayerStats, PlayerTag } from '@/shared/types/player';

export function createPlayer(
  id: number,
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