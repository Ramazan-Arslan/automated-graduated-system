import React, { useState, useEffect } from 'react';
import './select-an-advisor.component.css'
import MyTextField from '../textfield.component/mytextfield.component';
import getData from '../../data_access/getData';

async function getStudentData(userId) {
  var url = ('/user/students/' + userId);
  var obj = await getData(url);
  return obj;
}

function getList(studentObject)
{

  var mycontentlist = [{
    label: 'Name Surname',
    content: studentObject.name
  }, {
    label: 'Email',
    content: studentObject.email
  }, {
    label: 'Student ID',
    content: studentObject.id
    
  }]

  return mycontentlist;
}


export default function SelectAdvisor() {

  var userId = localStorage.getItem('id');
  const [userInfo, setUserInfo] = useState(Object);
  const [contentList, setContentList] = useState([]);
  useEffect(async () => {
    var studentObject = await getStudentData(userId);
    setUserInfo(studentObject);    
    setContentList(getList(studentObject));
  });


  return (
    <div className='select-advisor'>
         <h1 className='titlem'>Select Advisor</h1>
            <MyTextField myprops={contentList}/>
    
    </div>

  )
}
