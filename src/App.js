import './App.css'
import SideBar from './components/sidebar.component/sidebar.component.js'
import Header from './components/header.component/header.component.js'
import Login from './components/login.component/login.component.js'

function App() {
  if (!Boolean(localStorage.getItem('id'))) {
    return (
      <div className='Login'>
        <Login />
      </div>
    )
  } else {
    return (
      <div className='App'>
        <Header />
        <SideBar />
      </div>
    )
  }
}

export default App
