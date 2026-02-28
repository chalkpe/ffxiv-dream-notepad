import { useAtomValue } from 'jotai'
import { cn } from '../../lib/utils'
import { safeIslandAtom } from '../../stores/state'

export const PostIsland = () => {
  const safeIsland = useAtomValue(safeIslandAtom)

  return (
    <>
      {safeIsland && (
        <div
          className={cn(
            'size-[41.5%]',
            'border-[#FFCC00] border-[0.25vmin] border-dotted rounded-full absolute -translate-y-1/2',
            safeIsland === 'D' ? '-translate-x-1/2' : 'translate-x-1/2',
          )}
          style={safeIsland === 'D' ? { left: '21%', top: '50%' } : { right: '21%', top: '50%' }}
        />
      )}
    </>
  )
}
