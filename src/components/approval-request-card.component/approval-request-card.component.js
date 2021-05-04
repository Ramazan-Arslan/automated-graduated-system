import React from 'react'
import './approval-request-card.component.css'
import { Avatar, Button } from '@material-ui/core'

export default function ApprovalRequestCard(props) {
  return (
    <div className='approval-request'>
      <div>
        <Avatar alt='Remy Sharp' src='/broken-image.jpg' className='userAvatar'>
        {props.student.name.charAt(0)}
        </Avatar>
      </div>
      <div className='requester-info'>
        <p className='requester-name'>{props.student.name + " " + props.student.surname}</p>
        <p className='requester-department'>{props.student.department}</p>
      </div>
      <div className='decide-buttons'>
        <Button className='decide accept'>Accept</Button>
        <Button className='decide reject'>Reject</Button>
      </div>
    </div>
  )
}
