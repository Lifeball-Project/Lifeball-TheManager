import Phaser from 'phaser';

export type CreatePhaserConfigParams = {
  parent: HTMLElement;                // React에서 ref.current
  scenes: (Phaser.Types.Scenes.SettingsConfig | Phaser.Scene | typeof Phaser.Scene)[]; // 사용할 씬들
  debug?: boolean;                    // 물리 디버그
  backgroundColor?: string;           // 배경색
  pixelArt?: boolean;                 // 픽셀 아트 스케일링
};

/**
 * 컨테이너 크기에 맞춰 초기 width/height를 잡고,
 * 탑다운(중력 0) 아케이드 물리로 설정한 기본 Config 생성기
 */
export function createPhaserConfig({
  parent,
  scenes,
  debug = false,
  backgroundColor = '#1b1b1b',
  pixelArt = true,
}: CreatePhaserConfigParams): Phaser.Types.Core.GameConfig {
  const { clientWidth, clientHeight } = parent;

  return {
    type: Phaser.AUTO,
    parent,                           // DOM 컨테이너를 직접 지정
    backgroundColor,
    width: Math.max(clientWidth, 320),   // 최소 가드
    height: Math.max(clientHeight, 180), // 최소 가드
    pixelArt,                         // 픽셀 깨짐 방지(탑다운 타일에 유리)
    roundPixels: pixelArt,            // 렌더 좌표 반올림

    // 탑다운: 중력 0
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
        debug,
      },
    },

    // 반응형 스케일 옵션: 부모 크기에 맞춰 Fit
    scale: {
      mode: Phaser.Scale.FIT,         // NO_BORDER/FIT/ENVELOP/RESIZE 등 필요에 맞게
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent,                         // 명시해도 되고 위 parent로 충분
      width: Math.max(clientWidth, 320),
      height: Math.max(clientHeight, 180),
    },

    scene: scenes,
    // 성능 관련 권장 옵션
    render: {
      antialias: !pixelArt,
      pixelArt,                       // 일부 버전은 render.pixelArt와 상위 pixelArt 둘 다 인식
      powerPreference: 'high-performance',
    },
  };
}
