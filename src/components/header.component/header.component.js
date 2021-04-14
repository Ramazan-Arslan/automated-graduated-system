import React from 'react';
import './header.component.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'



export default function Header(){
    return(
      <div className="header">
          <div className="headericon">
            <FontAwesomeIcon style={{ height:'100px'}} icon={faHome} />
            <FontAwesomeIcon icon={faBell} />
            </div>
        </div>



 )         
};