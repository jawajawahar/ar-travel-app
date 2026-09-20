import { useState } from 'react'
import HomeScreen from './HomeScreen'
import ARView from './ARView'

export default function App() {
  const [screen, setScreen] = useState<'home' | 'ar'>('home')

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      {screen === 'home' ? (
        <HomeScreen onOpenAR={() => setScreen('ar')} />
      ) : (
        <ARView onBack={() => setScreen('home')} />
      )}
    </div>
  )
}
