import { useAtom } from 'jotai'
import { roles } from '../lib/ffxiv'
import { cn } from '../lib/utils'
import { roleAtom } from '../stores/state'

export const RoleSwitch = () => {
  const [role, setRole] = useAtom(roleAtom)

  if (role) return null

  return (
    <nav className="w-full h-full grid grid-cols-4 gap-4 p-4">
      {roles.map((r) => (
        <button
          key={r.id}
          type="button"
          onClick={() => setRole(r.id)}
          className={cn(
            'rounded-xl text-xl font-bold',
            r.type === 'T' && 'bg-blue-600 text-white',
            r.type === 'H' && 'bg-green-600 text-white',
            r.type === 'D' && 'bg-red-600 text-white',
          )}
        >
          {r.id}
        </button>
      ))}
    </nav>
  )
}
