import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { swallowedCloneAtom } from '../../stores/state'
import { MapImage } from './MapImage'
import { PostIsland } from './PostIsland'
import { PostIslandMovement } from './PostIslandMovement'
import { PreIslandMovement } from './PreIslandMovement'
import { TowerNearFar } from './TowerNearFar'
import { Waymarks } from './Waymarks'

export const Battlefield = () => {
  const swallowedClone = useAtomValue(swallowedCloneAtom)
  const isPostPhase = useMemo(() => swallowedClone !== undefined, [swallowedClone])

  return (
    <div className="aspect-square relative w-[85vmin]">
      <MapImage />
      <Waymarks />

      {isPostPhase ? (
        <>
          <PostIslandMovement />
          <PostIsland />
        </>
      ) : (
        <>
          <PreIslandMovement />
          <TowerNearFar />
        </>
      )}
    </div>
  )
}
