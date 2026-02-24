import { useAtom } from 'jotai'
import { attackTypes, cloneEncounterPositions, playerPositions, safeAreas } from '../lib/ffxiv'
import { cn } from '../lib/utils'
import { cloneEncounterPositionAtom, firstAttackAtom, playerPositionAtom, safeAreaAtom } from '../stores/state'

export const DreamSwitchA = () => {
  const [cloneEncounterPosition, setCloneEncounterPosition] = useAtom(cloneEncounterPositionAtom)
  const [playerPosition, setPlayerPosition] = useAtom(playerPositionAtom)
  const [firstAttack, setFirstAttack] = useAtom(firstAttackAtom)
  const [safeArea, setSafeArea] = useAtom(safeAreaAtom)

  const marker = playerPositions.find((info) => info.id === playerPosition)?.marker

  return (
    <div className="flex flex-col items-center justify-stretch gap-4 w-fit">
      <nav className="border-2 border-gray-400 rounded-xl p-4 w-fit flex gap-2">
        {cloneEncounterPositions.map((info) => (
          <button
            key={info.id}
            type="button"
            onClick={() => setCloneEncounterPosition(info.id)}
            className={cn(
              'relative w-20 h-20',
              cloneEncounterPosition !== undefined && cloneEncounterPosition !== info.id && 'opacity-20 cursor-not-allowed',
            )}
          >
            <img src={`/button_${info.id}.png`} alt={info.name} className="w-16 h-16 z-0 top-1.5 left-2 absolute" />
            <img src="/frame.png" alt="테두리" className="absolute top-0 left-0 w-20 h-20 z-10" />
          </button>
        ))}
      </nav>
      <nav className="border-2 border-gray-400 rounded-xl p-4 w-fit flex gap-2">
        {safeAreas.map((area) => (
          <button
            key={area}
            type="button"
            onClick={() => setSafeArea(area)}
            className={cn(safeArea !== undefined && safeArea !== area && 'opacity-20 cursor-not-allowed')}
          >
            <img
              src={`/waymark${area.toLowerCase()}.png`}
              alt={`${area}징 양옆`}
              className={cn('w-20 h-20 border-4 rounded-full', area === 'A' && 'border-[#FF6E6EAA]', area === 'C' && 'border-[#9BECFEAA]')}
            />
          </button>
        ))}
      </nav>

      <div className="border-2 border-gray-400 rounded-xl p-4 w-full grid grid-cols-3 gap-2 relative items-center justify-center">
        {playerPositions.map((info) => (
          <button
            key={info.id}
            type="button"
            onClick={() => setPlayerPosition(info.id)}
            style={{ gridRow: info.gridPosition.row, gridColumn: info.gridPosition.col }}
            className={cn(playerPosition !== undefined && playerPosition !== info.id && 'opacity-20 cursor-not-allowed')}
          >
            <img src={`/waymark${info.waymark.toLowerCase()}.png`} alt={info.name} className="size-12" />
          </button>
        ))}
        {marker && (
          <img src={`/${marker}.png`} alt="징" className="size-32 absolute top-0 left-0 right-0 bottom-0 m-auto pointer-events-none" />
        )}
      </div>

      <nav className="border-2 border-gray-400 rounded-xl p-4 w-fit flex gap-2">
        {attackTypes.map((attack) => (
          <button
            key={attack}
            type="button"
            onClick={() => setFirstAttack(attack)}
            className={cn(firstAttack !== undefined && firstAttack !== attack && 'opacity-20 cursor-not-allowed')}
          >
            <img src={`/${attack}.png`} alt={attack} className="w-20 h-20" />
          </button>
        ))}
      </nav>
    </div>
  )
}
