import React from 'react';
import './header.component.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Avatar } from '@material-ui/core';

export default function Header(){
    return(
      <div className="header">
          <div className="headericon">
            <FontAwesomeIcon style={{ height:'100px'}} icon={faHome} />
            <FontAwesomeIcon icon={faBell} />
            </div>

            <div className="userCard">
                <Avatar alt="Remy Sharp" src="/broken-image.jpg" className="userAvatar">F</Avatar>
                <div className="userInfo">
                  <p className="userTitle">Furkan Sahin</p> {/* İlerde burası databaseden çekilcek user.name gibi*/}
                  <p className="userType">Student</p>
                </div>
            </div>


        </div>



 )         
};