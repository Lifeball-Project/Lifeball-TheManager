# 기획/설계 문서 들어갈예정

```
apps/web/src
├─ app/                      # 앱 엔트리/전역 라우팅(씬 스위치)
│  ├─ main.tsx               # React 엔트리
│  └─ SceneRenderer.tsx      # 씬 전환 컨트롤러 (Zustand)
│
├─ ui/                       # "메타 UI" (React) : 메뉴/설정/인벤토리 등
│  ├─ background/BackgroundWrapper.tsx
│  ├─ commons/Button.tsx
│  ├─ start/StartContainer.tsx
│  ├─ setup/
│  │  ├─ StepManager.tsx
│  │  └─ steps/
│  │     ├─ PlayerNameStep.tsx
│  │     ├─ GameLoreStep.tsx
│  │     ├─ RegionSelectStep.tsx
│  │     └─ TeamSetupStep.tsx
│  └─ overlays/              # 인게임 오버레이(React HUD/모달)
│     ├─ PauseMenu.tsx
│     └─ SettingsPanel.tsx
│
├─ game/                     # "인게임"(Phaser) : 렌더/월드/시스템
│  ├─ GameCanvas.tsx         # React 안에서 Phaser 생성/정리
│  ├─ game-config.ts         # Phaser GameConfig 팩토리
│  ├─ scenes/                # Phaser 씬 (Boot/Play 등)
│  │  ├─ BootScene.ts
│  │  └─ PlayScene.ts
│  ├─ core/                  # 엔진 레벨(입력, 카메라, 맵 로더 등)
│  │  ├─ camera.ts
│  │  └─ input.ts
│  ├─ systems/               # 도메인 시스템(전술, 경기 로직, AI 등)
│  │  ├─ match-engine/
│  │  │  ├─ simulateInning.ts
│  │  │  └─ tactics.ts
│  │  └─ player-systems/
│  │     ├─ generatePlayerStats.ts
│  │     └─ randomPlayer.ts
│  └─ assets/                # Phaser에서 임포트하는 정적 리소스(선호 시)
│
├─ data/                     # 정적 데이터(세계관/지역/태그 등)
│  ├─ gameLore.ts
│  ├─ regionData.ts
│  └─ playerTag.ts
│
├─ stores/                   # 전역 상태(Zustand)
│  ├─ useSceneStore.ts       # start/setup/game 전환
│  ├─ useSetupStore.ts       # 초기 설정(이름, 지역, 팀 구성)
│  └─ useSettingsStore.ts    # 볼륨/키바인딩/그래픽 등
│
├─ services/                 # 저장/로딩/네트워킹 추상화
│  ├─ save/
│  │  ├─ SaveStore.ts        # 인터페이스 (버전/마이그레이션 훅)
│  │  ├─ IndexedDBStore.ts   # v1: 브라우저 저장
│  │  └─ SQLiteWasmStore.ts  # v2: 브라우저 SQLite(OPFS)
│  └─ api/
│     └─ client.ts           # (선택) 백엔드 연동용
│
├─ utils/                    # 범용 유틸(수학/랜덤/타입가드 등)
│  ├─ rng.ts
│  └─ time.ts
│
├─ types/                    # 타입(공유 도메인 타입)
│  ├─ player.ts
│  ├─ team.ts
│  └─ setup.ts
│
└─ styles/                   # (선택) 전역/리셋/Tailwind
   └─ index.css
```
