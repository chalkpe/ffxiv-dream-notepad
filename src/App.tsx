import { Battlefield } from './components/Battlefield'
import { DreamSwitchA } from './components/DreamSwitchA'
import { RoleSwitch } from './components/RoleSwitch'

function App() {
  return (
    <div className="w-full h-screen flex items-center justify-center gap-4">
      <RoleSwitch />
      <DreamSwitchA />
      <Battlefield />
    </div>
  )
}

export default App
