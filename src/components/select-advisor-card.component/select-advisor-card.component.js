import React from 'react'
import './select-advisor-card.component.css'
import { Avatar } from '@material-ui/core';
import { Button } from '@material-ui/core';
;

export default function SelectAdvisorCard() {
  return (
    <div className='card'>
      <Avatar alt='Remy Sharp' src='/broken-image.jpg' className='card-avatar'>O </Avatar>
      <p className="card-name">Görkem Giray</p> {/* databaseden çekilecek*/ }
      <p className="card-section">Computer Engineering</p> 
      <p className="card-defination">Profession: Software Engineering</p> {/* databaseden çekilecek*/ }
      <Button variant="contained">Go To Detail</Button>
    </div>
  )
}