import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import type { AttackType, CloneEncounterPosition, ClonePosition, IslandType, Role, TetherClonePosition, TowerType } from '../lib/ffxiv'

/** 내 역할 */
export const roleAtom = atomWithStorage<Role | undefined>('role', undefined)

/** 첫 번째 분신 등장 위치 */
export const cloneEncounterPositionAtom = atom<CloneEncounterPosition>()

/** 안전지대 위치 (A징 양옆 or C징 양옆) */
export const safeAreaAtom = atom<ClonePosition>()

/** 플레이어 분신 줄 연결 방향 */
export const playerPositionAtom = atom<TetherClonePosition>()

/** 첫 번째 공격 종류 */
export const firstAttackAtom = atom<AttackType>()

/** 내 위치의 탑 종류 */
export const towerTypeAtom = atom<TowerType>()

/** 블랙홀에 흡입된 분신 (12시 or 6시) */
export const swallowedCloneAtom = atom<ClonePosition>()

/** 안전한 섬 */
export const safeIslandAtom = atom<IslandType>()
