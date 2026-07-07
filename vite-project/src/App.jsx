import './App.css'
import Home from './components/Home'
import Menu from './components/Menu'
import { Outlet } from 'react-router-dom'
function App() {
  return (
    <div id="app">
      <Menu></Menu>
      <Outlet></Outlet>
    </div>
  )
}

export default App;
