import { Race } from "../race/race-types";
import { PlayerStats } from "./stats-types";

// 종족별 능력치 보정
export const statModifiersByRace: Record<Race, Partial<PlayerStats>> = {
  휴먼: {},
  엘프: { speed: 1, power: -1 },
  드워프: { power: 2, speed: -2 },
  오우거: { power: 4, speed: -3 },
  고블린: { speed: 2, power: -2 },
  하피: { speed: 3, defense: -1 },
  언데드: { defense: 1, contact: -1 },
  슬라임: { pitching: 1, contact: -1 },
};