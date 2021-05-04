import React, { useState, useEffect } from 'react';
import './header.component.css';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Avatar } from '@material-ui/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import UserController from '../../controllers/UserController';



async function getUserData(userId,userType) {
  const userController = new UserController();
  const obj = await userController.takeUserInfo(userId, userType);
  if (Boolean(obj.name)) {
    return obj;
  }
  else {
    return ({name:"Error",surname:"Error"});
  } 
}



export default function Header() {
  
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
  }

  var userId = localStorage.getItem('id');
  var userType = localStorage.getItem('type');
  const [userInfo, setUserInfo] = useState(Object({name:"",surname:""}));
  useEffect(async () => {
    var userObject = await getUserData(userId,userType);
    setUserInfo(userObject);    
  },[]);

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
        {userInfo.name.charAt(0)}
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
                localStorage.removeItem('type')
                window.history.pushState(null, "Automated Graduation System", "/")
                window.location.reload(true)
               
              }}
            />
          </div>
          <p className='userType'>{userInfo.type}</p>
        </div>
      </div>
    </div>
  )
};

