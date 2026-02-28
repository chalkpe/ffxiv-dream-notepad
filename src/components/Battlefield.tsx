import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { bottomTowers, type MovementPosition, movementMapping, roles, topTowers } from '../lib/ffxiv'
import { cn } from '../lib/utils'
import {
  cloneEncounterPositionAtom,
  firstAttackAtom,
  playerPositionAtom,
  roleAtom,
  safeAreaAtom,
  safeIslandAtom,
  swallowedCloneAtom,
  towerTypeAtom,
} from '../stores/state'

const positionToCoordinates: Record<MovementPosition, { x: number; y: number; safeX?: number; safeY?: number }> = {
  A: { x: 50, y: 21 },
  B: { x: 100 - 21, y: 50 },
  C: { x: 50, y: 100 - 21, safeX: 50, safeY: 100 - 13 },
  D: { x: 21, y: 50, safeX: 13, safeY: 50 },
  '1': { x: 50, y: 33 },
  '2': { x: 100 - 33, y: 50 },
  '3': { x: 50, y: 100 - 33 },
  '4': { x: 33, y: 50 },
  X: { x: 100 - 33 - 3, y: 33 + 3 },
}

export const Battlefield = () => {
  const className = 'size-[6.5%] absolute -translate-x-1/2 -translate-y-1/2'

  const role = useAtomValue(roleAtom)
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
    <div className="aspect-square relative w-[85vmin]">
      <img src={mapType} alt="전장" className="absolute top-0 left-0 w-full h-full object-contain rounded-full" />

      <img
        src="waymarka.png"
        alt="A징"
        className={cn(className, 'bg-[#FF6E6E] rounded-full')}
        style={{ left: `${positionToCoordinates.A.x}%`, top: `${positionToCoordinates.A.y}%` }}
      />
      <img
        src="waymarkb.png"
        alt="B징"
        className={cn(className, 'bg-[#F3FB9C] rounded-full')}
        style={{ left: `${positionToCoordinates.B.x}%`, top: `${positionToCoordinates.B.y}%` }}
      />
      <img
        src="waymarkc.png"
        alt="C징"
        className={cn(className, 'bg-[#9BECFE] rounded-full')}
        style={{ left: `${positionToCoordinates.C.x}%`, top: `${positionToCoordinates.C.y}%` }}
      />
      <img
        src="waymarkd.png"
        alt="D징"
        className={cn(className, 'bg-[#C878FF] rounded-full')}
        style={{ left: `${positionToCoordinates.D.x}%`, top: `${positionToCoordinates.D.y}%` }}
      />

      <img
        src="waymark1.png"
        alt="1번징"
        className={cn(className, 'bg-[#FF6E6E] p-[0.3vmin]')}
        style={{ left: `${positionToCoordinates['1'].x}%`, top: `${positionToCoordinates['1'].y}%` }}
      />
      <img
        src="waymark2.png"
        alt="2번징"
        className={cn(className, 'bg-[#F3FB9C] p-[0.3vmin]')}
        style={{ left: `${positionToCoordinates['2'].x}%`, top: `${positionToCoordinates['2'].y}%` }}
      />
      <img
        src="waymark3.png"
        alt="3번징"
        className={cn(className, 'bg-[#9BECFE] p-[0.3vmin]')}
        style={{ left: `${positionToCoordinates['3'].x}%`, top: `${positionToCoordinates['3'].y}%` }}
      />
      <img
        src="waymark4.png"
        alt="4번징"
        className={cn(className, 'bg-[#C878FF] p-[0.3vmin]')}
        style={{ left: `${positionToCoordinates['4'].x}%`, top: `${positionToCoordinates['4'].y}%` }}
      />

      {/* <div
        className={cn('size-[41.5%]', 'border-[#82FFF9] border-[2vmin] rounded-full absolute -translate-x-1/2 -translate-y-1/2')}
        style={{
          left: '21%',
          top: '50%',
        }}
      /> */}

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

          {movementDirection && myIslandPosition && (
            <line
              x1={((positionToCoordinates[movementDirection[3]].safeX ?? positionToCoordinates[movementDirection[3]].x) / 100) * 6}
              y1={((positionToCoordinates[movementDirection[3]].safeY ?? positionToCoordinates[movementDirection[3]].y) / 100) * 6}
              x2={(myIslandPosition.x / 100) * 6}
              y2={(myIslandPosition.y / 100) * 6}
              stroke="#FFCC00CC"
              strokeWidth="0.05"
            />
          )}

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
    </div>
  )
}
