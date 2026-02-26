import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { type MovementPosition, movementMapping } from '../lib/ffxiv'
import { cn } from '../lib/utils'
import { firstAttackAtom, playerPositionAtom } from '../stores/state'

const positionToCoordinates: Record<MovementPosition, { x: number; y: number; safeX?: number; safeY?: number }> = {
  A: { x: 50, y: 15.5 },
  B: { x: 100 - 15.5, y: 50 },
  C: { x: 50, y: 100 - 15.5, safeX: 50, safeY: 100 - 6 },
  D: { x: 15.5, y: 50, safeX: 6, safeY: 50 },
  '1': { x: 50, y: 29 },
  '2': { x: 100 - 29, y: 50 },
  '3': { x: 50, y: 100 - 29 },
  '4': { x: 29, y: 50 },
  X: { x: 66, y: 33 },
}

export const Battlefield = () => {
  const firstAttack = useAtomValue(firstAttackAtom)
  const playerPosition = useAtomValue(playerPositionAtom)

  const movementDirection = useMemo(
    () => (firstAttack && playerPosition ? movementMapping[`${playerPosition}-${firstAttack}`] : null),
    [firstAttack, playerPosition],
  )

  const className = 'size-[6.5vmin] absolute -translate-x-1/2 -translate-y-1/2'

  return (
    <div style={{ backgroundImage: 'url(/field.png)' }} className="aspect-square relative rounded-full w-[100vmin] bg-contain">
      {/* <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-gray-400" /> */}

      {/* <div className="w-full h-1 absolute top-1/2 left-0 bg-gray-400" />
      <div className="w-1 h-full absolute top-0 left-1/2 bg-gray-400" /> */}

      <img
        src="/waymarka.png"
        alt="A징"
        className={cn(className, 'bg-[#FF6E6E] rounded-full')}
        style={{ left: `${positionToCoordinates.A.x}%`, top: `${positionToCoordinates.A.y}%` }}
      />
      <img
        src="/waymarkb.png"
        alt="B징"
        className={cn(className, 'bg-[#F3FB9C] rounded-full')}
        style={{ left: `${positionToCoordinates.B.x}%`, top: `${positionToCoordinates.B.y}%` }}
      />
      <img
        src="/waymarkc.png"
        alt="C징"
        className={cn(className, 'bg-[#9BECFE] rounded-full')}
        style={{ left: `${positionToCoordinates.C.x}%`, top: `${positionToCoordinates.C.y}%` }}
      />
      <img
        src="/waymarkd.png"
        alt="D징"
        className={cn(className, 'bg-[#C878FF] rounded-full')}
        style={{ left: `${positionToCoordinates.D.x}%`, top: `${positionToCoordinates.D.y}%` }}
      />

      <img
        src="/waymark1.png"
        alt="1번징"
        className={cn(className, 'bg-[#FF6E6E] p-[0.3vmin]')}
        style={{ left: `${positionToCoordinates['1'].x}%`, top: `${positionToCoordinates['1'].y}%` }}
      />
      <img
        src="/waymark2.png"
        alt="2번징"
        className={cn(className, 'bg-[#F3FB9C] p-[0.3vmin]')}
        style={{ left: `${positionToCoordinates['2'].x}%`, top: `${positionToCoordinates['2'].y}%` }}
      />
      <img
        src="/waymark3.png"
        alt="3번징"
        className={cn(className, 'bg-[#9BECFE] p-[0.3vmin]')}
        style={{ left: `${positionToCoordinates['3'].x}%`, top: `${positionToCoordinates['3'].y}%` }}
      />
      <img
        src="/waymark4.png"
        alt="4번징"
        className={cn(className, 'bg-[#C878FF] p-[0.3vmin]')}
        style={{ left: `${positionToCoordinates['4'].x}%`, top: `${positionToCoordinates['4'].y}%` }}
      />

      {movementDirection && (
        <svg viewBox="0 0 6 6" className="absolute top-0 left-0 w-full h-full" aria-label="이동 방향">
          {movementDirection
            .flatMap((pos, index) => (index > 0 ? [[movementDirection[index - 1], pos]] : []))
            .map(([from, to], index) => (
              <line // biome-ignore lint/suspicious/noArrayIndexKey: index is stable here as movementDirection length is fixed
                key={`movement-${index}`}
                x1={((positionToCoordinates[from].safeX ?? positionToCoordinates[from].x) / 100) * 6}
                y1={((positionToCoordinates[from].safeY ?? positionToCoordinates[from].y) / 100) * 6}
                x2={((positionToCoordinates[to].safeX ?? positionToCoordinates[to].x) / 100) * 6}
                y2={((positionToCoordinates[to].safeY ?? positionToCoordinates[to].y) / 100) * 6}
                stroke="#ffcc00"
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
                  stroke={indices.has(1) ? 'lime' : 'black'}
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
                  >
                    {order}
                  </text>
                ))}
              </g>
            )
          })}
        </svg>
      )}
    </div>
  )
}
