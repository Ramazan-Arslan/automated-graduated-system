import React, { useState, useEffect } from 'react';
import './header.component.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Avatar } from '@material-ui/core';
import getData from '../../data_access/getData';


async function getStudentData()
{
  var url =('/user/students/250201042');
  var obj = await getData(url);
  return obj;
}


export default function Header() {

  const [userInfo, setUserInfo] = useState(Object({name:null,surname:null}));
  useEffect(async () => {
    var studentObject = await getStudentData();
    setUserInfo(studentObject);
  });

  return (
    <div className="header">
      <div className="headericon">
        <FontAwesomeIcon style={{ height: '100px' }} icon={faHome} />
        <FontAwesomeIcon icon={faBell} />
      </div>

      <div className="userCard">
        <Avatar alt="Remy Sharp" src="/broken-image.jpg" className="userAvatar">F</Avatar>
        <div className="userInfo">
          <p className="userTitle">{userInfo.name + " " + userInfo.surname}</p> {/* İlerde burası databaseden çekilcek user.name gibi*/}
          <p className="userType">Student</p>
        </div>
      </div>
    </div>
  )
};