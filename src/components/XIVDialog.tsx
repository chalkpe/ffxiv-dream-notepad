import type { PropsWithChildren } from 'react'
import { cn } from '../lib/utils'

type XIVDialogProps = PropsWithChildren<{
  type?: 'normal' | 'steel'
  className?: string
  containerClassName?: string
  innerClassName?: string
}>

export function XIVDialog({ children, type = 'normal', className, containerClassName, innerClassName }: XIVDialogProps) {
  return (
    <div
      className={cn(
        'relative inline-block',
        'rounded-[2vmin] border-[0.25vmin]',
        'px-[2.4vmin] py-[1.6vmin]',
        'bg-[#444044] text-[#f5f2e8]',
        type === 'normal' ? 'border-[#D6BA84]' : 'border-[#d9dad9]',
        type === 'normal'
          ? 'shadow-[0_0.2vmin_0_#604826,0_0.6vmin_1.2vmin_rgba(0,0,0,0.6)]'
          : 'shadow-[0_0.2vmin_0_#474547,0_0.6vmin_1.2vmin_rgba(0,0,0,0.6)]',
        containerClassName,
      )}
    >
      {/* 안쪽 입체 라인 */}
      <div
        className={cn(
          'pointer-events-none',
          'absolute inset-0',
          'rounded-[2vmin]',
          'border-t-[0.25vmin] border-l-[0.25vmin] border-r-[0.25vmin] border-b-[0.25vmin]',
          'border-t-[rgba(255,255,255,0.35)]',
          'border-l-[rgba(255,255,255,0.18)]',
          'border-r-[rgba(0,0,0,0.5)]',
          'border-b-[rgba(0,0,0,0.8)]',
          innerClassName,
        )}
      />
      {/* 실제 컨텐츠 */}
      <div className={cn('relative', className)}>{children}</div>
    </div>
  )
}
