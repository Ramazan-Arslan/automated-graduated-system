import React from 'react'
import './sidebar.component.css'
import iztechlogo from '../../assets/icons/iztech-logo.svg'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Routes from '../../routes/route.js'

// %25 genişlik
export default function SideBar() {
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
  }

  return (
    <div className='sidebar'>
      <img src={iztechlogo} className='iztechlogo' alt='logo' />
      <p className='title'>Izmir Institute of Technology </p>
      <hr className='hr' />
      <Router>
        <div>
          <ul className='ul-style'>
            {Routes.map((route) =>
              route.key < 9 ? (
                <li className='li-style'>
                  <Link style={linkStyle} to={route.path}>
                    {route.name}
                  </Link>
                </li>
              ) : null
            )}
          </ul>
          {Routes.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              component={route.component}
            />
          ))}
        </div>
      </Router>

      {/* 
      <BrowserRouter>
        {routeComponents}
        <div className="sidebarbutton button1" ><p>  Student Information <FontAwesomeIcon className= "icons" icon={faAngleRight} /> </p></div>
        <div className="sidebarbutton button2" ><p> General Operations <FontAwesomeIcon className= "icons" icon={faAngleRight} /></p></div>
        <div className="sidebarbutton button3" ><p> Advisor Operations <FontAwesomeIcon className= "icons" icon={faAngleRight} /></p></div>
        <div className="sidebarbutton button4" ><p> Forms<FontAwesomeIcon className= "icons" icon={faAngleRight} /></p></div>
        <div className="sidebarbutton button5" ><p> Settings</p></div>
        <div className="sidebarbutton button6" ><p> Help</p></div>
       </BrowserRouter>
       
        <div className="sidebarbutton button1" ><Link to='/studentinformation'><p> Student Information <FontAwesomeIcon className= "icons" icon={faAngleRight} /> </p> </Link></div>
        <div className="sidebarbutton button2" ><Link to='/advisorinformation'><p> General Operations <FontAwesomeIcon className= "icons" icon={faAngleRight} /></p> </Link></div>  */}
    </div>
  )
}

//
