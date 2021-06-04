import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import UserController from '../../controllers/UserController'

import './forms.component.css'

async function isValidStudentId(studentId, user) {
  const userController = new UserController()
  const obj = await userController.takeUserInfo(studentId, "student")
  var returnedValue = false;

  if (Boolean(obj.name)) {
    if (user.type === "advisor") {
      const advisorIdOfStudent = obj?.advisor?.advisorId;
      if (advisorIdOfStudent === user.id) {
        returnedValue = true
      }
      else {
        alert("Advisors only can reach his/her students' forms.")
      }
    }
    else {
      returnedValue = true
    }
  }

  return returnedValue
}



export default function Form() {
  var userType = localStorage.getItem('type')
  var userId = localStorage.getItem('id')
  const [user, setUser] = useState({ id: "", type: "" })
  const [studentId, setStudentId] = useState("")
  const [listIsAccessible, setListIsAccessible] = useState(false)
  const [contentList, setContentList] = useState([])

  useEffect(async () => {
    if (userType === "student") {
      setStudentId(userId)
    }
    setUser({ id: userId, type: userType })
    setContentListData();
  }, [])


  function setContentListData() {
    let contentList = [
      {
        label: 'Registration Form for Courses from Other Institutions (Form DA)',
        formId: 'Form_DA',
        path: null
      },
      {
        label: "Education Evaluation Form for Master's Students Defending their Thesis (Form TJ-a)",
        formId: 'Form_TJ-a',
        path: null
      },
      {
        label: 'Thesis Defense Exam Form for Jury Attending Online (Form TS-b)',
        formId: 'Form_TS-b',
        path: null
      },
      {
        label: "Defense Exam Notification Form for Students Who Have Revised Their Thesis (Form TJ-D)",
        formId: 'Form_TJ-D',
        path: null
      },
      {
        label: 'Thesis Final Copy Submission Deadline Extension Form (Form ES)',
        formId: 'Form_ES',
        path: null
      },
      {
        label: 'Thesis Final Copy Submission Form (Form TT)',
        formId: 'Form_TT',
        path: null
      },

    ]
    if (userType === "officer") {
      contentList.push(
        {
          label: 'Thesis Advisor and Topic Appointment Form (Form TD)',
          formId: 'Form_TD',
          path: '/thesisadvisorandtopicappointmentbyeabd'
        },
        {
          label: 'Thesis Defense Jury Appointment Form(Form TJ)',
          formId: 'Form_TJ',
          path: '/juryappointmentbyeabd'
        },
        {
          label: 'Thesis Defense Exam Jury Report Form (Form TS)',
          formId: 'Form_TS',
          path: '/thesisdefenseexamjuryreport'
        },
      )
    }

    else if (userType === "advisor") {

      contentList.push(
        {
          label: 'Thesis Advisor and Topic Appointment Form (Form TD)',
          formId: 'Form_TD',
          path: null
        },
        {
          label: 'Thesis Defense Jury Appointment Form(Form TJ)',
          formId: 'Form_TJ',
          path: '/juryappointmentbyadvisor'
        },
        {
          label: 'Thesis Defense Exam Jury Report Form (Form TS)',
          formId: 'Form_TS',
          path: null
        },
      )
    }
    else {

      contentList.push(
        {
          label: 'Thesis Defense Jury Appointment Form(Form TJ)',
          formId: 'Form_TJ',
          path: null
        },
        {
          label: 'Thesis Defense Exam Jury Report Form (Form TS)',
          formId: 'Form_TS',
          path: null
        },
        {
          label: 'Thesis Advisor and Topic Appointment Form (Form TD)',
          formId: 'Form_TD',
          path: '/thesisadvisorandtopicappointment'
        },
      )

      setListIsAccessible(true)
    }

    setContentList(contentList);
  }

  async function openForm(varib) {

    if (listIsAccessible && Boolean(studentId) && Boolean(varib.path)) {
      localStorage.setItem("FormStudentId", studentId);
      window.history.pushState(null, varib.label, varib.path)
      window.location.reload(true)
    }


  }

  async function controlStudentId() {
    if (Boolean(studentId)) {
      var isValidId = await isValidStudentId(studentId, user);
      if (!isValidId) {
        alert("Student ID is invalid.")
      }
      else {
        setListIsAccessible(true)
      }
    }
    else {
      alert("Student ID cannot be empty.")
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
