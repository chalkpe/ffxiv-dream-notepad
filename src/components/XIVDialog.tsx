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
        'rounded-lg border-2',
        'px-6 py-4',
        'bg-[#444044] text-[#f5f2e8]',
        type === 'normal' ? 'border-[#D6BA84]' : 'border-[#d9dad9]',
        type === 'normal' ? 'shadow-[0_2px_0_#604826,0_6px_12px_rgba(0,0,0,0.6)]' : 'shadow-[0_2px_0_#474547,0_6px_12px_rgba(0,0,0,0.6)]',
        containerClassName,
      )}
    >
      {/* 안쪽 입체 라인 */}
      <div
        className={cn(
          'pointer-events-none',
          'absolute inset-0',
          'rounded-lg',
          'border-t border-l border-r border-b',
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
