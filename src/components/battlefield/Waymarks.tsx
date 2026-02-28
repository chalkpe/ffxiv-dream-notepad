import { positionToCoordinates } from '../../lib/ffxiv'
import { cn } from '../../lib/utils'

export const Waymarks = () => {
  const className = 'size-[6.5%] absolute -translate-x-1/2 -translate-y-1/2'

  return (
    <>
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
    </>
  )
}
