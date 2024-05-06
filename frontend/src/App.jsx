import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import { Outlet } from 'react-router-dom'
function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
