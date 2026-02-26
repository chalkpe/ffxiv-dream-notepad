import type { ComponentProps, FC } from 'react'
import { cn } from '../lib/utils'

export const XIVButton: FC<ComponentProps<'button'>> = ({ className, children, ...props }) => {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        'cursor-pointer',
        'rounded-[10vmin] w-full px-[2vmin] py-[0.5vmin]',
        'shadow-[0_0.6vmin_1.2vmin_rgba(0,0,0,0.6)]',
        'text-white text-[3.5vmin]',
        'bg-[linear-gradient(to_bottom,#575757_0%,#575757_40%,#383838_60%,#383838_100%)]',
        'hover:bg-[linear-gradient(to_bottom,#6e6e6e_0%,#6e6e6e_40%,#4c4c4c_60%,#4c4c4c_100%)]',
        className,
      )}
    >
      {children}
    </button>
  )
}
