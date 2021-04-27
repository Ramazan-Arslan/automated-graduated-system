import React, { useState, useEffect } from 'react'
import './header.component.css'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Avatar } from '@material-ui/core'
import getData from '../../data_access/getData'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

async function getStudentData(userId) {
  var url = '/user/students/' + userId
  var obj = await getData(url)
  return obj
}

export default function Header() {
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
  }
  var userId = localStorage.getItem('id')
  const [userInfo, setUserInfo] = useState(Object({ name: '', surname: '' }))
  useEffect(async () => {
    var studentObject = await getStudentData(userId)
    setUserInfo(studentObject)
  })

  return (
    <div className='header'>
      <Router>
        <div className='headericon'>
          <Link style={linkStyle} to='/homepage'>
            <FontAwesomeIcon style={{ height: '100px' }} icon={faHome} />
          </Link>
          <Link style={linkStyle} to='/notification'>
            <FontAwesomeIcon icon={faBell} />
          </Link>
        </div>
      </Router>
      <div className='userCard'>
        <Avatar alt='Remy Sharp' src='/broken-image.jpg' className='userAvatar'>
          F
        </Avatar>
        <div className='userInfo'>
          <div className='upper'>
            <p className='userTitle'>
              {userInfo.name + ' ' + userInfo.surname}
            </p>
            <FontAwesomeIcon
              className='userLogOut'
              icon={faSignOutAlt}
              onClick={() => {
                localStorage.removeItem('id')
                window.location.reload(true)
              }}
            />
          </div>
          <p className='userType'>Student</p>
        </div>
      </div>
    </div>
  )
}
