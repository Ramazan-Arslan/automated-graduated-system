import React from 'react'
import './student-information.component.css'
import SelectAdvisor from '../select-an-advisor.component/select-an-advisor.component'

export default function StudentInformation() {
  return (
    <div className='student-information'>
      <SelectAdvisor/>
    </div>
  )
}
