import React from 'react'
import './select-advisor-card.component.css'
import { Avatar } from '@material-ui/core';
import { Button } from '@material-ui/core';


export default function SelectAdvisorCard(props) {
  return (
    <div className='card' >
      <Avatar alt='Remy Sharp' src='/broken-image.jpg' className='card-avatar'>{props.advisor.name.charAt(0)}</Avatar>
      <p className="card-name">{props.advisor.name + " " + props.advisor.surname}</p>
      <p className="card-section">{props.advisor.department}</p> 
      <p className="card-defination">Profession: Software Engineering</p>    
    </div>
  )
}