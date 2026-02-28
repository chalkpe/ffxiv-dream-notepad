export type Role = 'MT' | 'ST' | 'H1' | 'H2' | 'D1' | 'D2' | 'D3' | 'D4'

export type RoleType = 'T' | 'H' | 'D'

/** 쉐어 그룹: 멘조 or 섭조 */
export type StackGroup = 1 | 2

/** 산개 순서: 1번째 or 2번째 */
export type SpreadOrder = 1 | 2

/** 그룹 종류: 산개 or 쉐어 */
export type GroupType = 'spread' | 'stack'

/** 담당 탑 위치: 사각형 꼭지점 */
export type TowerPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export type RoleInfo = {
  id: Role
  type: RoleType
  group: StackGroup
  towerPosition: TowerPosition
}

export const roles: RoleInfo[] = [
  { id: 'MT', type: 'T', group: 1, towerPosition: 'top-right' },
  { id: 'ST', type: 'T', group: 2, towerPosition: 'bottom-left' },
  { id: 'H1', type: 'H', group: 1, towerPosition: 'bottom-left' },
  { id: 'H2', type: 'H', group: 2, towerPosition: 'top-right' },
  { id: 'D1', type: 'D', group: 1, towerPosition: 'bottom-right' },
  { id: 'D2', type: 'D', group: 2, towerPosition: 'top-left' },
  { id: 'D3', type: 'D', group: 1, towerPosition: 'top-left' },
  { id: 'D4', type: 'D', group: 2, towerPosition: 'bottom-right' },
]

/** 첫 번째 분신 등장 위치: 십자 or 엑스자 */
export type CloneEncounterPosition = 'plus' | 'cross'

export type CloneEncounterPositionInfo = {
  id: CloneEncounterPosition
  name: string
}

export const cloneEncounterPositions: CloneEncounterPositionInfo[] = [
  { id: 'plus', name: '십자' },
  { id: 'cross', name: '엑스자' },
]

/** 플레이어에게 줄이 연결되는 분신 위치: 8방위 */
export type TetherClonePosition = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'

/** 바닥징 종류 */
export type WaymarkType = 'A' | 'B' | 'C' | 'D' | '1' | '2' | '3' | '4'

/** 플레이어 머리징 종류: 공격, 금지, 속박 */
export type MarkerType = 'attack1' | 'attack2' | 'attack3' | 'attack4' | 'stop1' | 'stop2' | 'bind1' | 'bind2'

export type PlayerPositionInfo = {
  id: TetherClonePosition
  name: string
  waymark: WaymarkType
  marker: MarkerType
  group: StackGroup
  groupType: GroupType
  gridPosition: { row: number; col: number }
}

export const playerPositions: PlayerPositionInfo[] = [
  { id: 'N', name: 'A징', waymark: 'A', marker: 'attack1', group: 1, groupType: 'stack', gridPosition: { row: 1, col: 2 } },
  { id: 'NE', name: '1번징', waymark: '1', marker: 'attack3', group: 1, groupType: 'stack', gridPosition: { row: 1, col: 3 } },
  { id: 'E', name: 'B징', waymark: 'B', marker: 'attack2', group: 2, groupType: 'stack', gridPosition: { row: 2, col: 3 } },
  { id: 'SE', name: '2번징', waymark: '2', marker: 'attack4', group: 2, groupType: 'stack', gridPosition: { row: 3, col: 3 } },
  { id: 'S', name: 'C징', waymark: 'C', marker: 'stop1', group: 1, groupType: 'spread', gridPosition: { row: 3, col: 2 } },
  { id: 'SW', name: '3번징', waymark: '3', marker: 'bind1', group: 1, groupType: 'spread', gridPosition: { row: 3, col: 1 } },
  { id: 'W', name: 'D징', waymark: 'D', marker: 'stop2', group: 2, groupType: 'spread', gridPosition: { row: 2, col: 1 } },
  { id: 'NW', name: '4번징', waymark: '4', marker: 'bind2', group: 2, groupType: 'spread', gridPosition: { row: 1, col: 1 } },
]

/** 분신 위치 종류: A징 or C징 */
export type ClonePosition = 'A' | 'C'

export const safeAreas: ClonePosition[] = ['A', 'C']
export const swallowedClones: ClonePosition[] = ['A', 'C']

/** 공격 종류: 마나 폭발(산개) or 묵직한 내려찍기(4인 쉐어) */
export type AttackType = 'manaburst' | 'heavyslam'

export const attackTypes: AttackType[] = ['heavyslam', 'manaburst']

/** 탑 종류: 불(가만히), 땅(죽순), 바람(넉백), 어둠(죽선) */
export type TowerType = 'fire' | 'earth' | 'wind' | 'dark'

export type TowerInfo = {
  id: TowerType
  name: string
  color: string
}

export const topTowers: TowerInfo[] = [
  { id: 'wind', name: '바람', color: '#a2c584' },
  { id: 'earth', name: '땅', color: '#b97e62' },
]
export const bottomTowers: TowerInfo[] = [
  { id: 'fire', name: '불', color: '#e66163' },
  { id: 'dark', name: '어둠', color: '#8b65a6' },
]

/** 이동 지점: 바닥징 or X(산개 피하는 자리) */
export type MovementPosition = WaymarkType | 'X'

/** 패턴별 이동 경로 */
export const movementMapping: Record<
  `${TetherClonePosition}-${AttackType}`,
  [MovementPosition, MovementPosition, MovementPosition, MovementPosition]
> = {
  'N-heavyslam': ['1', 'X', '1', 'X'],
  'N-manaburst': ['X', '1', 'X', '1'],
  'NE-heavyslam': ['1', 'X', '1', 'X'],
  'NE-manaburst': ['X', '1', 'X', '1'],
  'E-heavyslam': ['2', 'X', '2', 'X'],
  'E-manaburst': ['X', '2', 'X', '2'],
  'SE-heavyslam': ['2', 'X', '2', 'X'],
  'SE-manaburst': ['X', '2', 'X', '2'],
  'S-heavyslam': ['1', 'D', '1', 'X'],
  'S-manaburst': ['D', '1', 'X', '1'],
  'SW-heavyslam': ['1', 'X', '1', 'D'],
  'SW-manaburst': ['X', '1', 'D', '1'],
  'W-heavyslam': ['2', 'C', '2', 'X'],
  'W-manaburst': ['C', '2', 'X', '2'],
  'NW-heavyslam': ['2', 'X', '2', 'C'],
  'NW-manaburst': ['X', '2', 'C', '2'],
}

export const movementPositionNames: Record<MovementPosition, { text: string; color: string; gimmick: string; urgent?: boolean }> = {
  '1': { text: '1번징', color: '#FF6E6E', gimmick: '쉐어' },
  '2': { text: '2번징', color: '#F3FB9C', gimmick: '쉐어' },
  '3': { text: '3번징', color: '#9BECFE', gimmick: '?' },
  '4': { text: '4번징', color: '#C878FF', gimmick: '?' },
  A: { text: 'A징', color: '#FF6E6E', gimmick: '?' },
  B: { text: 'B징', color: '#F3FB9C', gimmick: '?' },
  C: { text: 'C징 밖', color: '#9BECFE', gimmick: '산개', urgent: true },
  D: { text: 'D징 밖', color: '#C878FF', gimmick: '산개', urgent: true },
  X: { text: '본대', color: '#FFFFFF', gimmick: '산개 피하기' },
}

export const positionToCoordinates: Record<MovementPosition, { x: number; y: number; safeX?: number; safeY?: number }> = {
  A: { x: 50, y: 21 },
  B: { x: 100 - 21, y: 50 },
  C: { x: 50, y: 100 - 21, safeX: 50, safeY: 100 - 13 },
  D: { x: 21, y: 50, safeX: 13, safeY: 50 },
  '1': { x: 50, y: 33 },
  '2': { x: 100 - 33, y: 50 },
  '3': { x: 50, y: 100 - 33 },
  '4': { x: 33, y: 50 },
  X: { x: 100 - 33 - 3, y: 33 + 3 },
}

export type IslandType = 'B' | 'D'

export const islands: IslandType[] = ['D', 'B']

export type PostPhaseMovementPosition = 'A' | 'B' | 'AB' | 'BC' | '0' | '1' | '2' | '4' | 'b' | 'd'

export const postPhaseMovementMapping: Record<
  `${StackGroup}-${CloneEncounterPosition}-${ClonePosition}-${ClonePosition}-${IslandType}`,
  [PostPhaseMovementPosition, PostPhaseMovementPosition, PostPhaseMovementPosition, PostPhaseMovementPosition]
> = {
  '1-cross-A-A-B': ['AB', 'b', 'A', '1'], // A징이 좌우 안전인데, A징이 먹힘 => B징 섬에서 위아래 안전 => 1번징에서 좌우 안전 (불편하게)
  '1-cross-A-A-D': ['AB', 'd', 'A', '1'], // A징이 좌우 안전인데, A징이 먹힘 => D징 섬에서 위아래 안전 => 1번징에서 좌우 안전 (불편하게)
  '1-cross-A-C-B': ['AB', '2', 'A', '0'], // A징이 좌우 안전인데, C징이 먹힘 => B징 섬에서 좌우 안전 => 1번징에서 위아래 안전 (편하게)
  '1-cross-A-C-D': ['AB', '4', 'A', '0'], // A징이 좌우 안전인데, C징이 먹힘 => D징 섬에서 좌우 안전 => 1번징에서 위아래 안전 (편하게)
  '1-cross-C-A-B': ['AB', '2', 'A', '0'], // C징이 좌우 안전인데, A징이 먹힘 => B징 섬에서 좌우 안전 => 1번징에서 위아래 안전 (편하게)
  '1-cross-C-A-D': ['AB', '4', 'A', '0'], // C징이 좌우 안전인데, A징이 먹힘 => D징 섬에서 좌우 안전 => 1번징에서 위아래 안전 (편하게)
  '1-cross-C-C-B': ['AB', 'b', 'A', '1'], // C징이 좌우 안전인데, C징이 먹힘 => B징 섬에서 위아래 안전 => 1번징에서 좌우 안전 (불편하게)
  '1-cross-C-C-D': ['AB', 'd', 'A', '1'], // C징이 좌우 안전인데, C징이 먹힘 => D징 섬에서 위아래 안전 => 1번징에서 좌우 안전 (불편하게)
  '1-plus-A-A-B': ['A', 'b', 'AB', '1'],
  '1-plus-A-A-D': ['A', 'd', 'AB', '1'],
  '1-plus-A-C-B': ['A', '2', 'AB', '0'],
  '1-plus-A-C-D': ['A', '4', 'AB', '0'],
  '1-plus-C-A-B': ['A', '2', 'AB', '0'],
  '1-plus-C-A-D': ['A', '4', 'AB', '0'],
  '1-plus-C-C-B': ['A', 'b', 'AB', '1'],
  '1-plus-C-C-D': ['A', 'd', 'AB', '1'],
  '2-cross-A-A-B': ['BC', 'b', 'B', '1'],
  '2-cross-A-A-D': ['BC', 'd', 'B', '1'],
  '2-cross-A-C-B': ['BC', '2', 'B', '0'],
  '2-cross-A-C-D': ['BC', '4', 'B', '0'],
  '2-cross-C-A-B': ['BC', '2', 'B', '0'],
  '2-cross-C-A-D': ['BC', '4', 'B', '0'],
  '2-cross-C-C-B': ['BC', 'b', 'B', '1'],
  '2-cross-C-C-D': ['BC', 'd', 'B', '1'],
  '2-plus-A-A-B': ['B', 'b', 'BC', '1'],
  '2-plus-A-A-D': ['B', 'd', 'BC', '1'],
  '2-plus-A-C-B': ['B', '2', 'BC', '0'],
  '2-plus-A-C-D': ['B', '4', 'BC', '0'],
  '2-plus-C-A-B': ['B', '2', 'BC', '0'],
  '2-plus-C-A-D': ['B', '4', 'BC', '0'],
  '2-plus-C-C-B': ['B', 'b', 'BC', '1'],
  '2-plus-C-C-D': ['B', 'd', 'BC', '1'],
}

export const postPhasePositionNames: Record<PostPhaseMovementPosition, { text: string; color: string; gimmick: string }> = {
  '1': { text: '1번징 양옆', color: '#FF6E6E', gimmick: '불편하게' },
  '2': { text: '2번징', color: '#F3FB9C', gimmick: '편하게' },
  '0': { text: '배밑', color: '#FFFFFF', gimmick: '편하게' },
  '4': { text: '4번징', color: '#C878FF', gimmick: '편하게' },
  A: { text: 'A징 밖', color: '#FF6E6E', gimmick: '쉐어' },
  B: { text: 'B징 밖', color: '#F3FB9C', gimmick: '쉐어' },
  AB: { text: '1시 밖', color: '#FFFFFF', gimmick: '쉐어' },
  BC: { text: '5시 밖', color: '#FFFFFF', gimmick: '쉐어' },
  b: { text: 'B징 위아래', color: '#F3FB9C', gimmick: '불편하게' },
  d: { text: 'D징 위아래', color: '#C878FF', gimmick: '불편하게' },
}
