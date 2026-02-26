import { useAtom } from 'jotai'
import { useMemo } from 'react'
import { bottomTowers, islands, roles, swallowedClones, topTowers } from '../lib/ffxiv'
import { cn } from '../lib/utils'
import { roleAtom, safeIslandAtom, swallowedCloneAtom, towerTypeAtom } from '../stores/state'
import { DreamResetButton } from './DreamResetButton'
import { XIVButton } from './XIVButton'
import { XIVDialog } from './XIVDialog'

export const DreamSwitchB = () => {
  const [towerType, setTowerType] = useAtom(towerTypeAtom)
  const [role, setRole] = useAtom(roleAtom)
  const [swallowedClone, setSwallowedClone] = useAtom(swallowedCloneAtom)
  const [safeIsland, setSafeIsland] = useAtom(safeIslandAtom)

  const topTowersAligned = useMemo(() => {
    if (roles.find((r) => r.id === role)?.towerPosition?.endsWith('left') === (topTowers.findIndex((info) => info.id === towerType) === 0))
      return topTowers

    return [...topTowers].reverse()
  }, [role, towerType])

  const bottomTowersAligned = useMemo(() => {
    if (
      roles.find((r) => r.id === role)?.towerPosition?.endsWith('left') ===
      (bottomTowers.findIndex((info) => info.id === towerType) === 0)
    )
      return bottomTowers

    return [...bottomTowers].reverse()
  }, [role, towerType])

  const className = 'cursor-pointer size-[9vmin] rounded-full text-[3.5vmin] font-bold border-[0.75vmin]'

  return (
    <div className="flex flex-col items-center justify-stretch gap-[1.5vmin] shrink-0">
      <XIVDialog className="flex flex-col gap-[1vmin]" containerClassName="w-full" active={towerType === undefined}>
        <h2 className="text-[2.5vmin] font-bold">내가 밟을 탑</h2>
        <div className="grid grid-cols-2 gap-x-[2vmin] gap-y-[1.25vmin] items-center justify-content-center w-fit place-self-center">
          <div className="h-[1vmin] rounded-[1vmin] bg-[#666] row-start-2 col-span-2 w-full" />
          {[...topTowersAligned, ...bottomTowersAligned].map((tower) => (
            <button
              key={tower.id}
              type="button"
              onClick={() => setTowerType(tower.id)}
              className={cn(className, towerType !== undefined && towerType !== tower.id && 'opacity-10 cursor-not-allowed')}
              style={{ backgroundColor: `${tower.color}AA`, borderColor: tower.color }}
            >
              {tower.name}
            </button>
          ))}
        </div>
      </XIVDialog>
      <XIVDialog className="flex flex-col gap-[1vmin]" active={swallowedClone === undefined}>
        <h2 className="text-[2.5vmin] font-bold">블랙홀에 들어간 분신</h2>
        <div className="flex gap-[2vmin]">
          {swallowedClones.map((clonePosition) => (
            <button
              key={clonePosition}
              type="button"
              onClick={() => setSwallowedClone(clonePosition)}
              className={cn(
                'cursor-pointer',
                swallowedClone !== undefined && swallowedClone !== clonePosition && 'opacity-10 cursor-not-allowed',
              )}
            >
              <img
                src={`waymark${clonePosition.toLowerCase()}.png`}
                alt={`${clonePosition}징 양옆`}
                className={cn(
                  'size-[10vmin] border-[0.5vmin] rounded-full box-border',
                  clonePosition === 'A' && 'border-[#FF6E6EFF] bg-[#FF6E6E99]',
                  clonePosition === 'C' && 'border-[#9BECFEFF] bg-[#9BECFE99]',
                )}
              />
            </button>
          ))}
        </div>
      </XIVDialog>
      <XIVDialog className="flex flex-col gap-[1vmin]" active={safeIsland === undefined}>
        <h2 className="text-[2.5vmin] font-bold">안전한 섬</h2>
        <div className="flex gap-[2vmin]">
          {islands.map((island) => (
            <button
              key={island}
              type="button"
              onClick={() => setSafeIsland(island)}
              className={cn('cursor-pointer', safeIsland !== undefined && safeIsland !== island && 'opacity-10 cursor-not-allowed')}
            >
              <img
                src={`waymark${island.toLowerCase()}.png`}
                alt={`${island}섬`}
                className={cn(
                  'size-[10vmin] border-[0.5vmin] rounded-full box-border',
                  island === 'B' && 'border-[#F3FB9CFF] bg-[#F3FB9C99]',
                  island === 'D' && 'border-[#C878FFFF] bg-[#C878FF99]',
                )}
              />
            </button>
          ))}
        </div>
      </XIVDialog>

      <XIVDialog className="flex flex-col gap-[2vmin] p-[1vmin]" containerClassName="w-full">
        <XIVButton
          onClick={() =>
            setRole((role) =>
              roles.findIndex((r) => r.id === role) === roles.length - 1
                ? roles[0].id
                : roles[roles.findIndex((r) => r.id === role) + 1].id,
            )
          }
        >
          나: {role}
        </XIVButton>
        <DreamResetButton />
      </XIVDialog>
    </div>
  )
}
