import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import postRequest from '../../data_access/postRequest'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import App from '../../App'
import '../../components/login.component/login.component.css'
import iztechlogo from '../../assets/icons/iztech-logo.svg'

export default function Login() {
  const history = useHistory()
  const [userEmail, setEmail] = useState('')
  const [userPassword, setPassword] = useState('')

  async function login(email, password) {
    if (email != '' && password != '') {
      var obj = await loginRequest(email, password)
      console.log(obj)
      if (Boolean(obj.id)) {
        var json = {
          id: obj.id,
          name: obj.name,
          surname: obj.surname,
          department: obj.department,
        }
        localStorage.setItem('id', obj.id)
        window.location.reload(true)
      }
    }
  }

  async function loginRequest(email, password) {
    var json = {
      email: email,
      password: password,
    }
    var obj = await postRequest('/login', json)
    return obj
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
              variant='filled'
              className='inputbox password'
              onChange={(event) => {
                setPassword(event.target.value)
              }}
            />
            <p className='forgotPassword'>Forgot your password ?</p>
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
