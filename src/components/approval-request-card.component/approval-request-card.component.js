import React from 'react'
import './approval-request-card.component.css'
import { Avatar, Button } from '@material-ui/core'

export default function ApprovalRequestCard() {
  return (
    <div className='approval-request'>
      <div>
        <Avatar alt='Remy Sharp' src='/broken-image.jpg' className='userAvatar'>
          B
        </Avatar>
      </div>
      <div className='requester-info'>
        <p className='requester-name'>Bekir Yörük</p>
        <p className='requester-department'>Computer Engineering</p>
      </div>
      <div className='request-topic-info'>
        <p className='request-topic'>
          Thesis Topic: Computing in quatum computers
        </p>
        <Button className='go-detail'>Go to detail</Button>
      </div>
      <div className='decide-buttons'>
        <Button className='decide accept'>Accept</Button>
        <Button className='decide reject'>Reject</Button>
      </div>
    </div>
  )
}
