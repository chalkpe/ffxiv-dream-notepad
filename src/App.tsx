import { Battlefield } from './components/battlefield/Battlefield'
import { DreamSwitchA } from './components/DreamSwitchA'
import { DreamSwitchB } from './components/DreamSwitchB'

function App() {
  return (
    <div className="w-full h-screen flex items-center justify-center gap-[4vmin] bg-gray-900">
      <DreamSwitchA />
      <Battlefield />
      <DreamSwitchB />
    </div>
  )
}

export default App
