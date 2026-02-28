import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { bottomTowers, positionToCoordinates, roles, topTowers } from '../../lib/ffxiv'
import { cn } from '../../lib/utils'
import { roleAtom, towerTypeAtom } from '../../stores/state'

export const TowerNearFar = () => {
  const role = useAtomValue(roleAtom)
  const towerType = useAtomValue(towerTypeAtom)

  const info = useMemo(() => (role ? roles.find((r) => r.id === role) : null), [role])

  const myIslandPosition = useMemo(() => {
    if (!info || !towerType) return null

    const offset = 9.5
    const center = info.group === 1 ? positionToCoordinates.D : positionToCoordinates.B
    const color = [...topTowers, ...bottomTowers].find((t) => t.id === towerType)?.color ?? '#82FFF9'
    const isTowerSwapped = info.towerPosition.startsWith('top') !== topTowers.some((t) => t.id === towerType)

    switch (info.towerPosition) {
      case 'top-left':
        return { color, x: center.x - offset, y: isTowerSwapped ? center.y + offset : center.y - offset }
      case 'top-right':
        return { color, x: center.x + offset, y: isTowerSwapped ? center.y + offset : center.y - offset }
      case 'bottom-left':
        return { color, x: center.x - offset, y: isTowerSwapped ? center.y - offset : center.y + offset }
      case 'bottom-right':
        return { color, x: center.x + offset, y: isTowerSwapped ? center.y - offset : center.y + offset }
      default:
        return null
    }
  }, [towerType, info])

  return (
    <>
      {myIslandPosition && (
        <div
          className={cn(
            'flex items-center justify-center',
            'text-white text-[5vmin] font-bold',
            'size-[12%] border-[1vmin] rounded-full',
            'absolute -translate-x-1/2 -translate-y-1/2',
          )}
          style={{
            left: `${myIslandPosition.x}%`,
            top: `${myIslandPosition.y}%`,
            borderColor: myIslandPosition.color,
            backgroundColor: `${myIslandPosition.color}AA`,
          }}
        >
          5
        </div>
      )}
      {info && myIslandPosition && (
        <div
          className={cn(
            'size-[41.5%]',
            'border-[#FFCC00] border-[0.25vmin] border-dotted rounded-full absolute -translate-y-1/2',
            info.group === 1 ? '-translate-x-1/2' : 'translate-x-1/2',
          )}
          style={info.group === 1 ? { left: '21%', top: '50%' } : { right: '21%', top: '50%' }}
        />
      )}
    </>
  )
}
