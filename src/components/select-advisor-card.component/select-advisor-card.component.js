import React , { useState} from 'react'
import './select-advisor-card.component.css'
import { Avatar } from '@material-ui/core';


export default function SelectAdvisorCard(props) {
  const [isFocus, setFocus] = useState(false);
  console.log(props)
  return (
    <div className={isFocus ? 'card card1'  : 'card card2'}
      onClick={() => {
      setFocus(!isFocus);
      //isFocus ? className='card2' : className='card3'
    }} >
      <Avatar alt='Remy Sharp' src='/broken-image.jpg' className='card-avatar'>{props.advisor.name.charAt(0)}</Avatar>
      <p className="card-name">{props.advisor.name + " " + props.advisor.surname}</p>
      <p className="card-section">{props.advisor.department}</p> 
      <p className="card-defination">{props.advisor.experience}</p>    
    </div>
  )
}