import logo from './assets/icons/logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import ResponsiveDrawer from './components/sidebar.component/siderbar.component.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hi Guyss Bro !
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
         
        >
          Learn React
        </a>
        <Button variant="contained" color="primary">
          Hello World
          </Button>
          <ResponsiveDrawer/>
      </header>
         
    </div>
  );
}

export default App;
