import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../../components/login.component/login.component.css'
import iztechlogo from '../../assets/icons/iztech-logo.svg'
import OBSController from '../../controllers/OBSController';

export default function Login() {
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");


  async function login(email, password) {
    const obsController = new OBSController();
    const obj = await obsController.authentication(email, password);
    if (Boolean(obj.id)) {
      routeUser(obj);
    }
    else {
      alert(obj);
    }
  }

  function routeUser(obj) {
    localStorage.setItem('id', obj.id);
    localStorage.setItem('type', obj.type);
    window.history.pushState(null, "Automated Graduation System", "/")
    window.location.reload(true);
  }


  return (
    <div className='login'>
      <div className='input-box'>
        <div className='asd'>
          <div className='input-header'>
            <img src={iztechlogo} className='iztechlogo-login' alt='logo' />
            <p className='login-text'>Welcome to Automated Graduation System</p>
          </div>
          <div className='input-items'>
            <TextField
              id='email'
              placeholder='Email'
              variant='filled'
              className='inputbox email'
              onChange={(event) => {
                setEmail(event.target.value)
              }}
            />
            <TextField
              id='password'
              placeholder='Password'
              type='password'
              security='true'
              variant='filled'
              className='inputbox password'
              onChange={(event) => {
                setPassword(event.target.value)
              }}
            />
            <p className='forgotPassword' onClick={ () =>
            {
              window.location.href = 'https://obs.iyte.edu.tr/oibs/ogrenci/login.aspx'; 
           }}>Forgot your password ?</p>
            <Button
              className='login-button'
              onClick={() => {
                login(userEmail, userPassword)
              }}
            >
              <p style={{ fontWeight: 'Bold' }}>Log In</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
