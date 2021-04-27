import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import postRequest from '../../data_access/postRequest';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import App from '../../App';
import '../../components/login.component/login.component.css'







export default function Login() {
  const history = useHistory();
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");


  async function login(email, password) {
    if (email != "" && password != "") {
      var obj = await loginRequest(email, password);
      console.log(obj)
      if (Boolean(obj.id)) {
        var json=
        {
          id:obj.id,
          name:obj.name,
          surname:obj.surname,
          department:obj.department,
        }
        localStorage.setItem('id',obj.id);
        window.location.reload(true);
      }
    }

  }



  async function loginRequest(email, password) {
    var json =
    {
      email: email,
      password: password
    }
    var obj = await postRequest("/login", json);
    return obj;
  }

  return (
    
    <div className='login'>
      <TextField id="email" label="Email" variant="filled" onChange={(event) => { setEmail(event.target.value) }} />
      <TextField id="password" label="Password" variant="filled" onChange={(event) => { setPassword(event.target.value) }} />

      <Button onClick={() => {
        login(userEmail, userPassword);
      }} variant="contained">Login</Button>

    
 

    </div>

  )
}
