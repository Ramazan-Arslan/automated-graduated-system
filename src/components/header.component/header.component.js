import React from 'react'
import './header.component.css'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Avatar } from '@material-ui/core'

export default function Header() {
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
  }
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
          <p className='userTitle'>Furkan Sahin</p>{' '}
          {/* İlerde burası databaseden çekilcek user.name gibi*/}
          <p className='userType'>Student</p>
        </div>
      </div>
    </div>
  )
}
