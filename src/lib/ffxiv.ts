export type Role = 'MT' | 'ST' | 'H1' | 'H2' | 'D1' | 'D2' | 'D3' | 'D4'

export type RoleType = 'T' | 'H' | 'D'

/** 쉐어 그룹: 멘조 or 섭조 */
export type StackGroup = 1 | 2

/** 산개 순서: 1번째 or 2번째 */
export type SpreadOrder = 1 | 2

/** 그룹 종류: 산개 or 쉐어 */
export type GroupType = 'spread' | 'stack'

export type RoleInfo = {
  id: Role
  type: RoleType
  group: StackGroup
}

export const roles: RoleInfo[] = [
  { id: 'MT', type: 'T', group: 1 },
  { id: 'ST', type: 'T', group: 2 },
  { id: 'H1', type: 'H', group: 1 },
  { id: 'H2', type: 'H', group: 2 },
  { id: 'D1', type: 'D', group: 1 },
  { id: 'D2', type: 'D', group: 2 },
  { id: 'D3', type: 'D', group: 1 },
  { id: 'D4', type: 'D', group: 2 },
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
