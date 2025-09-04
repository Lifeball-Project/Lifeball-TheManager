import type { Player } from "@/types/player/player";
import type { PlayerTag } from "@/types/player/tag/tag-types";
import { playerTags } from "@/data/playerTags";
import { positions } from "@/types/player/player-position";
import { generatePlayerStats } from "./generatePlayerStats";

// 태그를 0~2개 랜덤 샘플링
export function getRandomTags(maxCount: number = 2): PlayerTag[] {
  const shuffled = [...playerTags].sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * (maxCount + 1)); // 0~2개
  return shuffled.slice(0, count);
}

// position 10종 모두 포함, race는 "휴먼", 태그 0~2개 랜덤
export function getRandomPlayerSelection(): Player[] {
  return positions.map((pos, idx) => {
    const tags = getRandomTags();
    return generatePlayerStats(idx + 1, "휴먼", pos, tags);
  });
}