import './App.css'
import SideBar from './components/sidebar.component/sidebar.component.js'
import Header from './components/header.component/header.component.js'
import Login from './components/login.component/login.component.js'
import auth from './components/auth';

function App() {
  if (auth()) {
    return (
      <div className='App'>
        <Header />
        <SideBar />
      </div>
    )
  }
  else {
    return (
      <div className='Login'>
        <Login />
      </div>
    )
  }
}

export default App
