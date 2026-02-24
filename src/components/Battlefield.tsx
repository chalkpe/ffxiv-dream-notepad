import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import type { AttackType, TetherClonePosition, WaymarkType } from '../lib/ffxiv'
import { firstAttackAtom, playerPositionAtom } from '../stores/state'

type MovementPosition = WaymarkType | 'X'

const movementMapping: Record<
  `${TetherClonePosition}-${AttackType}`,
  [MovementPosition, MovementPosition, MovementPosition, MovementPosition]
> = {
  'N-heavyslam': ['1', 'X', '1', 'X'],
  'N-manaburst': ['X', '1', 'X', '1'],
  'NE-heavyslam': ['1', 'X', '1', 'X'],
  'NE-manaburst': ['X', '1', 'X', '1'],
  'E-heavyslam': ['2', 'X', '2', 'X'],
  'E-manaburst': ['X', '2', 'X', '2'],
  'SE-heavyslam': ['2', 'X', '2', 'X'],
  'SE-manaburst': ['X', '2', 'X', '2'],
  'S-heavyslam': ['1', 'D', '1', 'X'],
  'S-manaburst': ['D', '1', 'X', '1'],
  'SW-heavyslam': ['1', 'X', '1', 'D'],
  'SW-manaburst': ['X', '1', 'D', '1'],
  'W-heavyslam': ['2', 'C', '2', 'X'],
  'W-manaburst': ['C', '2', 'X', '2'],
  'NW-heavyslam': ['2', 'X', '2', 'C'],
  'NW-manaburst': ['X', '2', 'C', '2'],
}

const positionToCoordinates: Record<MovementPosition, { x: number; y: number }> = {
  A: { x: 3, y: 1 },
  B: { x: 5, y: 3 },
  C: { x: 3, y: 5.7 },
  D: { x: 0.3, y: 3 },
  '1': { x: 3, y: 2 },
  '2': { x: 4, y: 3 },
  '3': { x: 3, y: 4 },
  '4': { x: 2, y: 3 },
  X: { x: 4, y: 2 },
}

export const Battlefield = () => {
  const firstAttack = useAtomValue(firstAttackAtom)
  const playerPosition = useAtomValue(playerPositionAtom)

  const movementDirection = useMemo(
    () => (firstAttack && playerPosition ? movementMapping[`${playerPosition}-${firstAttack}`] : null),
    [firstAttack, playerPosition],
  )

  return (
    <div className="h-10/12 aspect-square relative">
      <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-gray-400" />

      {/* <div className="w-full h-1 absolute top-1/2 left-0 bg-gray-400" />
      <div className="w-1 h-full absolute top-0 left-1/2 bg-gray-400" /> */}

      <img
        src="/waymarka.png"
        alt="A징"
        className="size-16 absolute top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-[#FF6E6EAA] rounded-full"
      />
      <img
        src="/waymarkb.png"
        alt="B징"
        className="size-16 absolute top-1/2 right-1/6 translate-x-1/2 -translate-y-1/2 border-4 border-[#F3FB9CAA] rounded-full"
      />
      <img
        src="/waymarkc.png"
        alt="C징"
        className="size-16 absolute bottom-1/6 left-1/2 -translate-x-1/2 translate-y-1/2 border-4 border-[#9BECFEAA] rounded-full"
      />
      <img
        src="/waymarkd.png"
        alt="D징"
        className="size-16 absolute bottom-1/2 left-1/6 -translate-x-1/2 translate-y-1/2 border-4 border-[#C878FFAA] rounded-full"
      />

      <img
        src="/waymark1.png"
        alt="1번징"
        className="size-16 absolute top-2/6 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-[#FF6E6EAA]"
      />
      <img
        src="/waymark2.png"
        alt="2번징"
        className="size-16 absolute top-1/2 right-2/6 translate-x-1/2 -translate-y-1/2 border-4 border-[#F3FB9CAA]"
      />
      <img
        src="/waymark3.png"
        alt="3번징"
        className="size-16 absolute bottom-2/6 left-1/2 -translate-x-1/2 translate-y-1/2 border-4 border-[#9BECFEAA]"
      />
      <img
        src="/waymark4.png"
        alt="4번징"
        className="size-16 absolute bottom-1/2 left-2/6 -translate-x-1/2 translate-y-1/2 border-4 border-[#C878FFAA]"
      />

      {movementDirection && (
        <svg viewBox="0 0 6 6" className="absolute top-0 left-0 w-full h-full" aria-label="이동 방향">
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
                <circle cx={coords.x} cy={coords.y} r="0.2" fill="#808080AA" stroke="black" strokeWidth="0.02" />
                {Array.from(indices).map((order, index) => (
                  <text
                    key={order}
                    x={coords.x + (indices.size > 1 ? (index - 0.5) * 0.16 : 0)}
                    y={coords.y}
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
