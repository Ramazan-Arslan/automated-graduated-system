import './App.css'
import SideBar from './components/sidebar.component/sidebar.component.js'
import Header from './components/header.component/header.component.js'

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
    <div className='App'>
      <Header />
      <SideBar />
    </div>
  )
}

export default App
