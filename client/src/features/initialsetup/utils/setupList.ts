import { createPlayer } from "@/features/initialsetup/utils/createPlayer";
import { Player, Position } from "@/shared/types/player";
import { PlayerTag } from "@/shared/types/tag";

export interface SetupPlayer {
  id: number;
  position: Position;
  race: "휴먼";
  tags?: PlayerTag[];
}

// PlayerTag 전체 목록
export const allPlayerTags: PlayerTag[] = [
  "빠름", "강타자", "정확함", "수비장인", "투수지존",
  "비만", "빈약함", "부정확", "새가슴", "긴장감"
];

// 태그를 0~2개 랜덤 샘플링
export function getRandomTags(maxCount: number = 2): PlayerTag[] {
  const shuffled = [...allPlayerTags].sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * (maxCount + 1)); // 0~2개
  return shuffled.slice(0, count);
}

// position 10종 모두 포함, race는 "휴먼", 태그 0~2개 랜덤
export function getRandomPlayerSelection(): Player[] {
  const positions: Position[] = [
    "투수", "포수", "1루수", "2루수", "3루수",
    "유격수", "좌익수", "중견수", "우익수", "지명타자"
  ];

  return positions.map((pos, idx) => {
    const tags = getRandomTags();
    return createPlayer(idx + 1, "휴먼", pos, tags);
  });
}