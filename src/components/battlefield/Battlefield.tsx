import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { swallowedCloneAtom } from '../../stores/state'
import { MapImage } from './MapImage'
import { PreIslandMovement } from './PreIslandMovement'
import { Waymarks } from './Waymarks'

export const Battlefield = () => {
  const swallowedClone = useAtomValue(swallowedCloneAtom)
  const isPostPhase = useMemo(() => swallowedClone !== undefined, [swallowedClone])

  return (
    <div className="aspect-square relative w-[85vmin]">
      <MapImage />
      <Waymarks />
      {!isPostPhase && <PreIslandMovement />}

      {/* <div
        className={cn('size-[41.5%]', 'border-[#82FFF9] border-[2vmin] rounded-full absolute -translate-x-1/2 -translate-y-1/2')}
        style={{
          left: '21%',
          top: '50%',
        }}
      /> */}
    </div>
  )
}
