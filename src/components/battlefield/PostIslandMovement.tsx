import { useAtomValue } from 'jotai'
import { ArrowRight } from 'lucide-react'
import { useMemo } from 'react'
import { type PostPhaseMovementPosition, postPhaseMovementMapping, postPhasePositionNames, roles } from '../../lib/ffxiv'
import { cloneEncounterPositionAtom, roleAtom, safeAreaAtom, safeIslandAtom, swallowedCloneAtom } from '../../stores/state'

const positionToCoordinates: Record<PostPhaseMovementPosition, { x: number; y: number }> = {
  A: { x: 50 + 5, y: 13.5 },
  B: { x: 100 - 13.5, y: 50 - 5 },
  AB: { x: 100 - 25, y: 25 },
  BC: { x: 100 - 25, y: 100 - 25 },
  '0': { x: 50, y: 50 },
  '1': { x: 50 + 7.5, y: 33 },
  '2': { x: 100 - 33, y: 50 },
  '4': { x: 33, y: 50 },
  b: { x: 100 - 21, y: 50 + 7.5 },
  d: { x: 21, y: 50 + 7.5 },
}

export const PostIslandMovement = () => {
  const role = useAtomValue(roleAtom)
  const cloneEncounterPosition = useAtomValue(cloneEncounterPositionAtom)
  const safeArea = useAtomValue(safeAreaAtom)
  const swallowedClone = useAtomValue(swallowedCloneAtom)
  const safeIsland = useAtomValue(safeIslandAtom)

  const movementDirection = useMemo(
    () =>
      role && cloneEncounterPosition && safeArea && swallowedClone && safeIsland
        ? postPhaseMovementMapping[
            `${roles.find((r) => r.id === role)?.group ?? 1}-${cloneEncounterPosition}-${safeArea}-${swallowedClone}-${safeIsland}`
          ]
        : null,
    [cloneEncounterPosition, role, safeArea, safeIsland, swallowedClone],
  )

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
                x1={(positionToCoordinates[from].x / 100) * 6}
                y1={(positionToCoordinates[from].y / 100) * 6}
                x2={(positionToCoordinates[to].x / 100) * 6}
                y2={(positionToCoordinates[to].y / 100) * 6}
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
              }, new Map<PostPhaseMovementPosition, Set<number>>())
              .entries(),
          ).map(([pos, indices]) => {
            const coords = positionToCoordinates[pos]
            return (
              <g key={pos}>
                <circle
                  cx={(coords.x / 100) * 6}
                  cy={(coords.y / 100) * 6}
                  r="0.2"
                  fill="#808080AA"
                  stroke={indices.has(1) ? '#FFAA00' : 'black'}
                  strokeWidth="0.03"
                />
                {Array.from(indices).map((order, index) => (
                  <text
                    key={order}
                    x={(coords.x / 100) * 6 + (indices.size > 1 ? (index - 0.5) * 0.16 : 0)}
                    y={(coords.y / 100) * 6}
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
        <div className="absolute top-0 left-0 right-0 w-full flex items-center justify-center text-white text-[5vmin] font-bold pointer-events-none">
          <ruby style={{ color: postPhasePositionNames[movementDirection[0]].color }}>
            {postPhasePositionNames[movementDirection[0]].text}
            <rt>{postPhasePositionNames[movementDirection[0]].gimmick}</rt>
          </ruby>
          <ArrowRight className="size-[5vmin]" />{' '}
          <ruby style={{ color: postPhasePositionNames[movementDirection[1]].color }}>
            {postPhasePositionNames[movementDirection[1]].text}
            <rt>{postPhasePositionNames[movementDirection[1]].gimmick}</rt>
          </ruby>
          <ArrowRight className="size-[5vmin]" />{' '}
          <ruby style={{ color: postPhasePositionNames[movementDirection[2]].color }}>
            {postPhasePositionNames[movementDirection[2]].text}
            <rt>{postPhasePositionNames[movementDirection[2]].gimmick}</rt>
          </ruby>
          <ArrowRight className="size-[5vmin]" />{' '}
          <ruby style={{ color: postPhasePositionNames[movementDirection[3]].color }}>
            {postPhasePositionNames[movementDirection[3]].text}
            <rt>{postPhasePositionNames[movementDirection[3]].gimmick}</rt>
          </ruby>
        </div>
      )}
    </>
  )
}
