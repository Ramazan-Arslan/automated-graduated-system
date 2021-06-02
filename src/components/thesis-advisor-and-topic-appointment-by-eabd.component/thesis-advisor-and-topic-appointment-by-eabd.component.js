import React, { useState, useEffect } from 'react'
import './thesis-advisor-and-topic-appointment-by-eabd.component.css'
import MyTextField from '../textfield.component/mytextfield.component'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Helper from './thesis-advisor-and-topic-appointment-by-eabd.component-helper'

async function canFormBeFilled(form) {
  if (Boolean(form) && form.status === "Sent") {
    return true;
  }
  return false;
}

async function receiveFormData(studentId, formId) {
  var formObject = await Helper.getFormData(studentId, formId)
  return formObject
}


export default function ThesisAdvisorAndTopicAppointmentByEabd() {

  const [modalIsOpen, setOpenModal] = useState(false)
  const [form, setForm] = useState(null)
  const [contentList, setContentList] = useState(null)
  const [formIsSubmitted, setFormIsSubmitted] = useState(false)
  const [studentId, setStudentId] = useState("")

  useEffect(async () => {
    var formStudentId = localStorage.getItem("FormStudentId")
    setStudentId(formStudentId)
    var formData = await receiveFormData(formStudentId, "Form_TD")
    setForm(formData)
    var isSubmitted = await canFormBeFilled(formData)
    setFormIsSubmitted(isSubmitted)
    setContentListData(formData);
  }, [])

  function setContentListData(formData) {
    if (Boolean(formData)) {
      let contentList = [
        {
          label: 'Name Surname',
          content: formData.studentName + " " + formData.studentSurname
        },
        {
          label: 'Student ID',
          content: formData.studentId
        },
        {
          label: 'Advisor Name',
          content: formData.advisorName + " " + formData.advisorSurname
        },
        {
          label: 'Program',
          content: formData.program,
        },
        {
          label: 'Thesis Name',
          content: formData.thesisName,
        }]

      setContentList(contentList);
    }
  }

  async function decisionButton(result) {
    if (result === "Accept") {
      await Helper.setFormStatus(studentId, "Form_TD", "Accepted")
    }
    else if (result === "Reject") {
      await Helper.setFormStatus(studentId, "Form_TD", "Rejected")
    }
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 1150,
      height: 500,
      backgroundColor: '#d4d4d4',
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
    },
    control: (base, state) => ({
      ...base,
      border: '1px solid black',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid black',
      },
    }),
  }))
  const classes = useStyles()
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle)

  function getModalStyle() {
    const top = 50
    const left = 50
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    }
  }


  return (
    <div>
      {!Boolean(form) &&

        <div className='thesis-advisor-and-topic-appointment-by-eabd'>
          <p className='tnt-appointment-topic'>
            Thesis Advisor And Topic Appointment
        </p>

        <p className='tnt-appointment-topic'>
            {"Form is not submitted for : " + studentId}
      </p>

        </div>

      }
      {Boolean(form) &&
        <div className='thesis-advisor-and-topic-appointment-by-eabd'>
          <p className='tnt-appointment-topic'>
            Thesis Advisor And Topic Appointment
      </p>
          {Boolean(contentList) && <div className='tnt-eabd-default-values'>
            <MyTextField myprops={contentList} />
          </div>}

          <div className='tnt-appointment-buttons'>
            <Button

              className='button preview'
              onClick={() => {
                decisionButton("Accept")
              }}
            >
              <p style={{ fontWeight: 'Bold' }}>Accept</p>
            </Button>
          </div>

          <div className='tnt-appointment-buttons'>
            <Button
              disabled={!formIsSubmitted}
              className='button preview'
              onClick={() => {
                decisionButton("Reject")
              }}
            >
              <p style={{ fontWeight: 'Bold' }}>Reject</p>
            </Button>
          </div>
        </div>}

    </div>

  )
}
