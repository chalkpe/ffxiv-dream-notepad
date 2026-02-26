import { useAtom } from 'jotai'
import { attackTypes, cloneEncounterPositions, playerPositions, safeAreas } from '../lib/ffxiv'
import { cn } from '../lib/utils'
import { cloneEncounterPositionAtom, firstAttackAtom, playerPositionAtom, safeAreaAtom } from '../stores/state'
import { XIVDialog } from './XIVDialog'

export const DreamSwitchA = () => {
  const [cloneEncounterPosition, setCloneEncounterPosition] = useAtom(cloneEncounterPositionAtom)
  const [playerPosition, setPlayerPosition] = useAtom(playerPositionAtom)
  const [firstAttack, setFirstAttack] = useAtom(firstAttackAtom)
  const [safeArea, setSafeArea] = useAtom(safeAreaAtom)

  const marker = playerPositions.find((info) => info.id === playerPosition)?.marker

  return (
    <div className="flex flex-col items-center justify-stretch gap-[1.5vmin] shrink-0">
      <XIVDialog className="flex flex-col gap-[1vmin]" active={cloneEncounterPosition === undefined}>
        <h2 className="text-[2.5vmin] font-bold">첫 분신 등장 위치</h2>
        <div className="flex gap-[2vmin]">
          {cloneEncounterPositions.map((info) => (
            <button
              key={info.id}
              type="button"
              onClick={() => setCloneEncounterPosition(info.id)}
              className={cn(
                'relative size-[10vmin] cursor-pointer',
                cloneEncounterPosition !== undefined && cloneEncounterPosition !== info.id && 'opacity-10 cursor-not-allowed',
              )}
            >
              <img src={`button_${info.id}.png`} alt={info.name} className="size-[8vmin] z-0 top-[0.6vmin] left-[1vmin] absolute" />
              <img src="frame.png" alt="테두리" className="absolute top-0 left-0 size-[10vmin] z-10" />
            </button>
          ))}
        </div>
      </XIVDialog>
      <XIVDialog className="flex flex-col gap-[1vmin]" active={safeArea === undefined}>
        <h2 className="text-[2.5vmin] font-bold">부채꼴 안전지대</h2>
        <div className="flex gap-[2vmin]">
          {safeAreas.map((area) => (
            <button
              key={area}
              type="button"
              onClick={() => setSafeArea(area)}
              className={cn('cursor-pointer', safeArea !== undefined && safeArea !== area && 'opacity-10 cursor-not-allowed')}
            >
              <img
                src={`waymark${area.toLowerCase()}.png`}
                alt={`${area}징 양옆`}
                className={cn(
                  'size-[10vmin] border-[0.5vmin] rounded-full box-border',
                  area === 'A' && 'border-[#FF6E6EFF] bg-[#FF6E6E99]',
                  area === 'C' && 'border-[#9BECFEFF] bg-[#9BECFE99]',
                )}
              />
            </button>
          ))}
        </div>
      </XIVDialog>

      <XIVDialog className="flex flex-col gap-[1vmin]" active={playerPosition === undefined}>
        <h2 className="text-[2.5vmin] font-bold">분신 연결 방향</h2>
        <div className="grid grid-cols-3 gap-[1vmin] items-center justify-center relative">
          {playerPositions.map((info) => (
            <button
              key={info.id}
              type="button"
              onClick={() => setPlayerPosition(info.id)}
              style={{ gridRow: info.gridPosition.row, gridColumn: info.gridPosition.col }}
              className={cn(
                'cursor-pointer size-[7vmin] flex items-center justify-center',
                playerPosition !== undefined && playerPosition !== info.id && 'opacity-10 cursor-not-allowed',
              )}
            >
              <img src={`waymark${info.waymark.toLowerCase()}.png`} alt={info.name} className="size-[7vmin]" />
            </button>
          ))}
          {marker && (
            <img
              src={`${marker}.png`}
              alt="징"
              className="size-[16vmin] absolute top-0 left-0 right-0 bottom-0 m-auto pointer-events-none"
            />
          )}
        </div>
      </XIVDialog>

      <XIVDialog className="flex flex-col gap-[1vmin]" active={firstAttack === undefined}>
        <h2 className="text-[2.5vmin] font-bold">12시 쫄 공격 유형</h2>
        <div className="flex gap-[2vmin]">
          {attackTypes.map((attack) => (
            <button
              key={attack}
              type="button"
              onClick={() => setFirstAttack(attack)}
              className={cn(
                'cursor-pointer size-[10vmin]',
                firstAttack !== undefined && firstAttack !== attack && 'opacity-10 cursor-not-allowed',
              )}
            >
              <img src={`${attack}.png`} alt={attack} className="size-[10vmin] rounded-full aspect-square" />
            </button>
          ))}
        </div>
      </XIVDialog>
    </div>
  )
}
