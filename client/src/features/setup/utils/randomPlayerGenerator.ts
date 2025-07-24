import { Player } from "@/types/player/player";
import { Position } from "@/types/player/player-position";
import { PlayerTag } from "@/types/tag/tag-types";
import { generatePlayerStats} from "@/features/setup/utils/generatePlayerStats";
import { playerTags } from "@/features/setup/data/playerTags";
import { positions } from "@/types/player/player-position";

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