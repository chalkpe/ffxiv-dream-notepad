import { useEffect, useState } from 'react'
import { Battlefield } from './components/battlefield/Battlefield'
import { DreamSwitchA } from './components/DreamSwitchA'
import { DreamSwitchB } from './components/DreamSwitchB'
import { cn } from './lib/utils'

function App() {
  const [hasFocus, setHasFocus] = useState(false)
  useEffect(() => {
    const onFocus = () => setHasFocus(true)
    const onBlur = () => setHasFocus(false)
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return (
    <div className={cn('w-full h-screen flex items-center justify-center gap-[4vmin]', hasFocus ? 'bg-gray-500' : 'bg-gray-900')}>
      <DreamSwitchA />
      <Battlefield />
      <DreamSwitchB />
    </div>
  )
}

export default App
