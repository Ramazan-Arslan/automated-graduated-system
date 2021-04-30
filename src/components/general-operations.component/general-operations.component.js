import React from 'react'
import './general-operations.component.css'
import SelectAdvisorCard from '../select-advisor-card.component/select-advisor-card.component';

export default function GeneralOperation() {
  return (
    <div className='general-operation'>
      <h1>General Operation</h1>
        <div className="advisor-selection">
          <p className="advisor-selection-title">Select an Advisor</p>
          <div className="select-advisor-cards">
            <SelectAdvisorCard/>
            <SelectAdvisorCard/>
            <SelectAdvisorCard/>      
          </div>
         </div>
    </div>
  )
}
