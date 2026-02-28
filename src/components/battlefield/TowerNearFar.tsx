import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { bottomTowers, nearFarMapping, positionToCoordinates, roles, topTowers } from '../../lib/ffxiv'
import { cn } from '../../lib/utils'
import { roleAtom, towerTypeAtom } from '../../stores/state'

export const TowerNearFar = () => {
  const role = useAtomValue(roleAtom)
  const towerType = useAtomValue(towerTypeAtom)

  const info = useMemo(() => (role ? roles.find((r) => r.id === role) : null), [role])
  const center = useMemo(() => (info ? (info.group === 1 ? positionToCoordinates.D : positionToCoordinates.B) : null), [info])
  const opposite = useMemo(() => (info ? (info.group === 1 ? positionToCoordinates.B : positionToCoordinates.D) : null), [info])
  const towerColor = useMemo(() => [...topTowers, ...bottomTowers].find((t) => t.id === towerType)?.color ?? '#82FFF9', [towerType])

  const myIslandPosition = useMemo(() => {
    if (!info || !center || !towerType) return null

    const offset = 9.5
    const isTowerSwapped = info.towerPosition.startsWith('top') !== topTowers.some((t) => t.id === towerType)

    switch (info.towerPosition) {
      case 'top-left':
        return { x: center.x - offset, y: isTowerSwapped ? center.y + offset : center.y - offset }
      case 'top-right':
        return { x: center.x + offset, y: isTowerSwapped ? center.y + offset : center.y - offset }
      case 'bottom-left':
        return { x: center.x - offset, y: isTowerSwapped ? center.y - offset : center.y + offset }
      case 'bottom-right':
        return { x: center.x + offset, y: isTowerSwapped ? center.y - offset : center.y + offset }
      default:
        return null
    }
  }, [towerType, info, center])

  const nearFarPosition = useMemo(() => {
    if (!info || !towerType || !center || !opposite) return null

    switch (nearFarMapping[`${info.position}-${info.group}-${towerType}`]) {
      case 'D6':
      case 'B6':
        return { x: center.x, y: center.y + 18 }

      case 'D3':
        return { x: opposite.x + 19, y: opposite.y }
      case 'B9':
        return { x: opposite.x - 19, y: opposite.y }

      case '2':
        return { x: center.x - 8, y: center.y }
      case '4':
        return { x: center.x + 8, y: center.y }

      case '2X':
        return { x: center.x - 4.5, y: center.y }
      case '4X':
        return { x: center.x + 4.5, y: center.y }
    }
  }, [info, towerType, center, opposite])

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
            borderColor: towerColor,
            backgroundColor: `${towerColor}AA`,
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
      {info && myIslandPosition && towerType === 'wind' && (
        <div
          className={cn(
            'size-[41.5%]',
            'border-[#a2c584] border-[0.25vmin] border-dotted rounded-full absolute -translate-y-1/2',
            info.group === 2 ? '-translate-x-1/2' : 'translate-x-1/2',
          )}
          style={info.group === 2 ? { left: '21%', top: '50%' } : { right: '21%', top: '50%' }}
        />
      )}

      {nearFarPosition && (
        <>
          <div
            className="bg-red-600 size-[1%] rounded-full absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${nearFarPosition.x}%`, top: `${nearFarPosition.y}%` }}
          />
          <div
            className="w-[5%] h-[0.25%] bg-red-600 absolute -translate-x-1/2 -translate-y-1/2 origin-center animate-spin"
            style={{ left: `${nearFarPosition.x}%`, top: `${nearFarPosition.y}%` }}
          />
          <div
            className="w-[0.25%] h-[5%] bg-red-600 absolute -translate-x-1/2 -translate-y-1/2 origin-center animate-spin"
            style={{ left: `${nearFarPosition.x}%`, top: `${nearFarPosition.y}%` }}
          />
        </>
      )}
    </>
  )
}
