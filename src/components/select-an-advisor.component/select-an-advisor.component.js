import React from 'react'
import './select-an-advisor.component.css'
import MyTextField from '../textfield.component/mytextfield.component';


export default function SelectAdvisor() {
    let mycontentlist  = [{
        label: 'Name Surname',
        content: 'Bekir Yoruk'
    },{
        label: 'Email',
        content: 'deneme@gmail.com'
    },{
        label: 'Student ID',
        content: '34324324234'
    }]

  return (
    <div className='select-advisor'>
      <h1 className='titlem'>Select Advisor</h1>
            <MyTextField   myprops={mycontentlist}/>
    </div>

  )
}
