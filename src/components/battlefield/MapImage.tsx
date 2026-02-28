import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import {
  cloneEncounterPositionAtom,
  firstAttackAtom,
  playerPositionAtom,
  safeAreaAtom,
  safeIslandAtom,
  swallowedCloneAtom,
  towerTypeAtom,
} from '../../stores/state'

export const MapImage = () => {
  const cloneEncounterPosition = useAtomValue(cloneEncounterPositionAtom)
  const safeArea = useAtomValue(safeAreaAtom)
  const playerPosition = useAtomValue(playerPositionAtom)
  const firstAttack = useAtomValue(firstAttackAtom)
  const towerType = useAtomValue(towerTypeAtom)
  const swallowedClone = useAtomValue(swallowedCloneAtom)
  const safeIsland = useAtomValue(safeIslandAtom)

  const mapType = useMemo(() => {
    const greenMap = 'map2.png'
    const blueMap = 'map3.png'
    const islandMap = 'map4.png'

    switch (true) {
      case cloneEncounterPosition === undefined:
        return greenMap
      case safeArea === undefined:
        return blueMap
      case playerPosition === undefined:
        return greenMap
      case firstAttack === undefined:
        return greenMap
      case towerType === undefined:
        return islandMap
      case swallowedClone === undefined:
        return greenMap
      case safeIsland === undefined:
        return islandMap
      default:
        return greenMap
    }
  }, [firstAttack, safeArea, cloneEncounterPosition, towerType, playerPosition, swallowedClone, safeIsland])

  return <img src={mapType} alt="전장" className="absolute top-0 left-0 w-full h-full object-contain rounded-full" />
}
