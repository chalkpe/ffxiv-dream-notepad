import { useAtom } from 'jotai'
import { bottomTowers, swallowedClones, topTowers } from '../lib/ffxiv'
import { cn } from '../lib/utils'
import { swallowedCloneAtom, towerTypeAtom } from '../stores/state'
import { XIVDialog } from './XIVDialog'

export const DreamSwitchB = () => {
  const [towerType, setTowerType] = useAtom(towerTypeAtom)
  const [swallowedClone, setSwallowedClone] = useAtom(swallowedCloneAtom)

  const className = 'size-[9vmin] rounded-full text-[3.5vmin] font-bold border-[0.75vmin]'

  return (
    <div className="flex flex-col items-center justify-stretch gap-[1.5vmin] shrink-0">
      <XIVDialog className="flex flex-col gap-[1vmin]" containerClassName="w-full">
        <h2 className="text-[2.5vmin] font-bold">내가 밟을 탑</h2>
        <div className="grid grid-cols-2 gap-x-[2vmin] gap-y-[1vmin] items-center justify-items-center">
          <div className="h-[1vmin] rounded-[1vmin] bg-[#505050] row-start-2 col-span-2" />
          {[...topTowers, ...bottomTowers].map((tower) => (
            <button
              key={tower.id}
              type="button"
              onClick={() => setTowerType(tower.id)}
              className={cn(className, towerType !== undefined && towerType !== tower.id && 'opacity-20 cursor-not-allowed')}
              style={{ backgroundColor: `${tower.color}AA`, borderColor: tower.color }}
            >
              {tower.name}
            </button>
          ))}
        </div>
      </XIVDialog>
      <XIVDialog className="flex flex-col gap-[1vmin]">
        <h2 className="text-[2.5vmin] font-bold">부채꼴 안전지대</h2>
        <div className="flex gap-[2vmin]">
          {swallowedClones.map((clonePosition) => (
            <button
              key={clonePosition}
              type="button"
              onClick={() => setSwallowedClone(clonePosition)}
              className={cn(swallowedClone !== undefined && swallowedClone !== clonePosition && 'opacity-20 cursor-not-allowed')}
            >
              <img
                src={`/waymark${clonePosition.toLowerCase()}.png`}
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
    </div>
  )
}
