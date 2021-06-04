import React, { useState, useEffect } from 'react'
import './thesis-advisor-and-topic-appointment-by-eabd.component.css'
import MyTextField from '../textfield.component/mytextfield.component'
import { Button } from '@material-ui/core'
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
  const [formIsAccessible, setFormIsAccessible] = useState(false)
  const [studentId, setStudentId] = useState("")

  useEffect(async () => {
    var formStudentId = localStorage.getItem("FormStudentId")
    setStudentId(formStudentId)
    var formData = await receiveFormData(formStudentId, "Form_TD")
    setForm(formData)
    var isAccessible = await canFormBeFilled(formData)
    setFormIsAccessible(isAccessible)
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
        },
        {
          label: 'Status',
          content: formData.status,
        }
      ]

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


  return (
    <div>
      {!Boolean(form) &&

        <div className='thesis-advisor-and-topic-appointment-by-eabd'>
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

          {formIsAccessible && <div>
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
                className='button preview'
                onClick={() => {
                  decisionButton("Reject")
                }}
              >
                <p style={{ fontWeight: 'Bold' }}>Reject</p>
              </Button>
            </div>
          </div>}
        </div>}

    </div>

  )
}
