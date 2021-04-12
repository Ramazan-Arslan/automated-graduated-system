import logo from './assets/icons/logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import SideBar from './components/sidebar.component/siderbar.component.js';
/*import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAP--lBXgxtFgxYLetw8fDza3sjsXjXb18",
  authDomain: "automated-graduation-system.firebaseapp.com",
  projectId: "automated-graduation-system",
  storageBucket: "automated-graduation-system.appspot.com",
  messagingSenderId: "695452591570",
  appId: "1:695452591570:web:00c7c0fc88f6f8890e140b",
  measurementId: "G-2ZGL6HJ7E6"
};

function InitilizeFirebase(){
  firebase.initializeApp(firebaseConfig);
}*/

function App() {
  return (
    <div className="App">
    <Button variant="contained" color="secondary">
      ilk sayfa
    </Button>
    <Button variant="contained" >
      ikinci sayfa
    </Button>
    <SideBar/>
  
    </div>
  );
}

export default App;
