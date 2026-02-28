import { useAtomValue } from 'jotai'
import { ArrowRight } from 'lucide-react'
import { useMemo } from 'react'
import {
  bottomTowers,
  type MovementPosition,
  movementMapping,
  movementPositionNames,
  positionToCoordinates,
  roles,
  topTowers,
} from '../../lib/ffxiv'
import { cn } from '../../lib/utils'
import { firstAttackAtom, playerPositionAtom, roleAtom, towerTypeAtom } from '../../stores/state'

export const PreIslandMovement = () => {
  const role = useAtomValue(roleAtom)
  const playerPosition = useAtomValue(playerPositionAtom)
  const firstAttack = useAtomValue(firstAttackAtom)
  const towerType = useAtomValue(towerTypeAtom)

  const movementDirection = useMemo(
    () => (firstAttack && playerPosition ? movementMapping[`${playerPosition}-${firstAttack}`] : null),
    [firstAttack, playerPosition],
  )

  const myIslandPosition = useMemo(() => {
    if (!role || !towerType) return null

    const info = roles.find((r) => r.id === role)
    if (!info) return null

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
  }, [role, towerType])

  return (
    <>
      {movementDirection && (
        <svg viewBox="0 0 6 6" className="absolute top-0 left-0 w-full h-full" aria-label="이동 방향">
          {movementDirection
            .flatMap((pos, index) => (index > 0 ? [[movementDirection[index - 1], pos]] : []))
            .map(([from, to], index) => (
              <line
                // biome-ignore lint/suspicious/noArrayIndexKey: Index is stable and used only for ordering
                key={`movement-${index}`}
                x1={((positionToCoordinates[from].safeX ?? positionToCoordinates[from].x) / 100) * 6}
                y1={((positionToCoordinates[from].safeY ?? positionToCoordinates[from].y) / 100) * 6}
                x2={((positionToCoordinates[to].safeX ?? positionToCoordinates[to].x) / 100) * 6}
                y2={((positionToCoordinates[to].safeY ?? positionToCoordinates[to].y) / 100) * 6}
                stroke="#FFCC00CC"
                strokeWidth="0.05"
              />
            ))}

          {Array.from(
            movementDirection
              .reduce((map, pos, index) => {
                const set = map.get(pos) || new Set<number>()
                set.add(index + 1)
                map.set(pos, set)
                return map
              }, new Map<MovementPosition, Set<number>>())
              .entries(),
          ).map(([pos, indices]) => {
            const coords = positionToCoordinates[pos]
            return (
              <g key={pos}>
                <circle
                  cx={((coords.safeX ?? coords.x) / 100) * 6}
                  cy={((coords.safeY ?? coords.y) / 100) * 6}
                  r="0.2"
                  fill="#808080AA"
                  stroke={indices.has(1) ? '#FFAA00' : 'black'}
                  strokeWidth="0.03"
                />
                {Array.from(indices).map((order, index) => (
                  <text
                    key={order}
                    x={((coords.safeX ?? coords.x) / 100) * 6 + (indices.size > 1 ? (index - 0.5) * 0.16 : 0)}
                    y={((coords.safeY ?? coords.y) / 100) * 6}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="0.24"
                    fontWeight="bold"
                    fill="white"
                  >
                    {order}
                  </text>
                ))}
              </g>
            )
          })}
        </svg>
      )}

      {movementDirection && (
        <div className="absolute top-0 left-0 right-0 w-full flex items-center justify-center text-white text-[5vmin] pointer-events-none font-bold">
          <ruby
            className={cn(movementPositionNames[movementDirection[0]].urgent && 'animate-bounce')}
            style={{
              animationDuration: '0.5s',
              color: movementPositionNames[movementDirection[0]].color,
            }}
          >
            {movementPositionNames[movementDirection[0]].text}
            <rt>{movementPositionNames[movementDirection[0]].gimmick}</rt>
          </ruby>
          <ArrowRight className="size-[5vmin]" />{' '}
          <ruby
            className={cn(movementPositionNames[movementDirection[1]].urgent && 'animate-bounce')}
            style={{
              animationDuration: '0.5s',
              color: movementPositionNames[movementDirection[1]].color,
            }}
          >
            {movementPositionNames[movementDirection[1]].text}
            <rt>{movementPositionNames[movementDirection[1]].gimmick}</rt>
          </ruby>
          <ArrowRight className="size-[5vmin]" />{' '}
          <ruby
            className={cn(movementPositionNames[movementDirection[2]].urgent && 'animate-bounce')}
            style={{
              animationDuration: '0.5s',
              color: movementPositionNames[movementDirection[2]].color,
            }}
          >
            {movementPositionNames[movementDirection[2]].text}
            <rt>{movementPositionNames[movementDirection[2]].gimmick}</rt>
          </ruby>
          <ArrowRight className="size-[5vmin]" />{' '}
          <ruby
            className={cn(movementPositionNames[movementDirection[3]].urgent && 'animate-bounce')}
            style={{
              animationDuration: '0.5s',
              color: movementPositionNames[movementDirection[3]].color,
            }}
          >
            {movementPositionNames[movementDirection[3]].text}
            <rt>{movementPositionNames[movementDirection[3]].gimmick}</rt>
          </ruby>
        </div>
      )}

      {myIslandPosition && (
        <div
          className="size-[12%] border-[1vmin] rounded-full absolute -translate-x-1/2 -translate-y-1/2 text-white text-[5vmin] font-bold flex items-center justify-center"
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
    </>
  )
}
