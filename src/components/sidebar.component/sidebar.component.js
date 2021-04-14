import React from 'react';
import './sidebar.component.css';

import iztechlogo from '../../assets/icons/iztech-logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

import { Link } from "react-router-dom";


// %25 genişlik 
export default function SideBar(){
  return(
    <div className="sidebar">
    
        <img src={iztechlogo} className="iztechlogo" alt="logo" />
        <p className="title">Izmir Institute of Technology </p>
        <hr className="hr" />
        <div className="sidebarbutton button1" ><Link to="/studentinformation" style={{ textDecoration: 'none' }} ><p>  Student Information <FontAwesomeIcon className= "icons" icon={faAngleRight} /> </p></Link></div>
        <div className="sidebarbutton button2" ><Link to="/advisorinformation" style={{ textDecoration: 'none' }} ><p> General Operations <FontAwesomeIcon className= "icons" icon={faAngleRight} /></p></Link></div>
        <div className="sidebarbutton button3" ><p> Advisor Operations <FontAwesomeIcon className= "icons" icon={faAngleRight} /></p></div>
        <div className="sidebarbutton button4" ><p> Forms<FontAwesomeIcon className= "icons" icon={faAngleRight} /></p></div>
        <div className="sidebarbutton button5" ><p> Settings</p></div>
        <div className="sidebarbutton button6" ><p> Help</p></div>
        
   
    </div>
  );


}