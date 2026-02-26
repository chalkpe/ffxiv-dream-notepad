import { useSetAtom } from 'jotai'
import { useCallback } from 'react'
import {
  cloneEncounterPositionAtom,
  firstAttackAtom,
  playerPositionAtom,
  safeAreaAtom,
  safeIslandAtom,
  swallowedCloneAtom,
  towerTypeAtom,
} from '../stores/state'
import { XIVButton } from './XIVButton'

export const DreamResetButton = () => {
  const setCloneEncounterPosition = useSetAtom(cloneEncounterPositionAtom)
  const setSafeAreaAtom = useSetAtom(safeAreaAtom)
  const setPlayerPositionAtom = useSetAtom(playerPositionAtom)
  const setFirstAttackAtom = useSetAtom(firstAttackAtom)
  const setTowerTypeAtom = useSetAtom(towerTypeAtom)
  const setSwallowedCloneAtom = useSetAtom(swallowedCloneAtom)
  const setSafeIslandAtom = useSetAtom(safeIslandAtom)

  const onClick = useCallback(() => {
    setCloneEncounterPosition(undefined)
    setSafeAreaAtom(undefined)
    setPlayerPositionAtom(undefined)
    setFirstAttackAtom(undefined)
    setTowerTypeAtom(undefined)
    setSwallowedCloneAtom(undefined)
    setSafeIslandAtom(undefined)
  }, [
    setCloneEncounterPosition,
    setFirstAttackAtom,
    setPlayerPositionAtom,
    setSafeAreaAtom,
    setSafeIslandAtom,
    setSwallowedCloneAtom,
    setTowerTypeAtom,
  ])

  return <XIVButton onClick={onClick}>리셋</XIVButton>
}
