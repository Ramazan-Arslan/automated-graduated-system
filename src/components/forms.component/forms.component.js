import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import UserController from '../../controllers/UserController'

import './forms.component.css'

async function isValidStudentId(studentId, user) {
  const userController = new UserController()
  const obj = await userController.takeUserInfo(studentId, "student")
  if (Boolean(obj.name)) {
    if (user.type === "advisor") {
      const advisorIdOfStudent = obj?.advisor?.advisorId;
      if (advisorIdOfStudent === user.id) {
        return true
      }
      else {
        alert("Advisors only can reach his/her students' forms.")
        return false
      }
    }
    else
    {
      return true
    }

  } else {
    return false
  }
}


export default function Form() {
  var userType = localStorage.getItem('type')
  var userId = localStorage.getItem('id')
  const [user, setUser] = useState({id : "", type: ""})
  const [studentId, setStudentId] = useState("")
  const [listIsAccessible, setListIsAccessible] = useState(false)
  const [contentList, setContentList] = useState([])

  useEffect(async () => {
    if (userType === "student") {
      setStudentId(userId)
    }
    setUser({id:userId, type:userType})
    setContentListData();
  }, [])


  function setContentListData() {
    let contentList = []
    if (userType === "officer") {
      contentList = [
        {
          label: 'Thesis Advisor and Topic Appointment Form (Form TD)',
          formId: 'Form_TD',
          path: '/thesisadvisorandtopicappointmentbyeabd'
        },
        {
          label: 'Thesis Defense Exam Jury Report Form(Form TS)',
          formId: 'Form_TS',
          path: '/thesisdefenseexamjuryreport'
        },
        {
          label: 'Thesis Defense Jury Appointment Form(Form TJ)',
          formId: 'Form_TJ',
          path: '/'
        },

      ]
    }

    else if (userType === "advisor") {

      contentList = [
        {
          label: 'Thesis Defense Jury Appointment Form(Form TJ)',
          formId: 'Form_TJ',
          path: '/juryappointmentbyadvisor'
        },
      ]

    }
    else {

      contentList = [
        {
          label: 'Thesis Advisor and Topic Appointment Form (Form TD)',
          formId: 'Form_TD',
          path: '/thesisadvisorandtopicappointment'
        },
      ]
      setListIsAccessible(true)
    }

    setContentList(contentList);
  }

  async function openForm(varib) {

    if (listIsAccessible && Boolean(studentId)) {
      localStorage.setItem("FormStudentId", studentId);
      window.history.pushState(null, varib.label, varib.path)
      window.location.reload(true)
    }


  }

  async function controlStudentId() {
    var isValidId = await isValidStudentId(studentId,user);
    if (!isValidId) {
      alert("Invalid student id")
    }
    else {
      setListIsAccessible(true)
    }
  }


  return (
    <div className='forms'>
      <h1>Forms</h1>
      {!(userType === "student") && <div className='tnt-std-input'>
        <p className='tnt-std-input-header'>Student Id</p>
        <TextField
          defaultValue={studentId}
          className='tnt-std-default-textfield name'
          id='standard-basic'
          value={studentId}
          onChange={(event) => setStudentId(event.target.value)}
        />

        <Button
          onClick={() => {
            controlStudentId()
          }}
        >
          <p style={{ fontWeight: 'Bold' }}>Search</p>
        </Button>
      </div>}

      {Boolean(contentList) && listIsAccessible && <div className='tnt-std-default-inputlar'>
        {contentList.map((varib) => (
          <div className='tnt-std-default-label' key={varib.path}
            onClick={() => openForm(varib)}>
            <p>{varib.label}</p>

          </div>
        ))}
      </div>}

    </div>
  )
}
