import { useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { cn } from '../lib/utils'
import {
  cloneEncounterPositionAtom,
  firstAttackAtom,
  playerPositionAtom,
  safeAreaAtom,
  safeIslandAtom,
  swallowedCloneAtom,
  towerTypeAtom,
} from '../stores/state'

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

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'cursor-pointer',
        'rounded-[10vmin] w-full px-[2vmin] py-[0.5vmin]',
        'shadow-[0_0.6vmin_1.2vmin_rgba(0,0,0,0.6)]',
        'text-white text-[3.5vmin]',
        'bg-[linear-gradient(to_bottom,#575757_0%,#575757_40%,#383838_60%,#383838_100%)]',
        'hover:bg-[linear-gradient(to_bottom,#6e6e6e_0%,#6e6e6e_40%,#4c4c4c_60%,#4c4c4c_100%)]',
      )}
    >
      리셋
    </button>
  )
}
