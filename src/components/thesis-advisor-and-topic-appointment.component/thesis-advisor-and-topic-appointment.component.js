import React, { useState, useEffect } from 'react'
import './thesis-advisor-and-topic-appointment.component.css'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Lock from '@material-ui/icons/Lock'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Helper from './thesis-advisor-and-topic-appointment.component-helper'

var msgText = ""
async function canFormBeFilled(studentId, formId) {
  var isAdvisorSelected = await Helper.isAdvisorSelected(studentId)
  if (!isAdvisorSelected) {
    msgText += ("You must have an advisor to fill in the form.")
  }
  var canFormBeFilled = await Helper.isFormAccessible(studentId, formId)
  return canFormBeFilled && isAdvisorSelected;
}

async function receiveFormData(studentId, formId) {
  var studentObject = await Helper.getStudentData(studentId)
  var advisorObject = await Helper.getAdvisorData(studentId)
  var formObject = await Helper.getFormData(studentId, formId)

  var json = {
    studentName: studentObject.name,
    studentSurname: studentObject.surname,
    studentId: studentObject.id,
    program: "Master",
    advisorName: advisorObject?.name,
    advisorSurname: advisorObject?.surname,
    thesisName: formObject?.thesisName,
  }

  return json
}


export default function ThesisAdvisorAndTopicAppointment() {
  var userId = localStorage.getItem('id')
  var userType = localStorage.getItem('type')

  const [modalIsOpen, setOpenModal] = useState(false)
  const [thesisTopic, setThesisTopic] = useState('')
  const [form, setForm] = useState(null)
  const [contentList, setContentList] = useState(null)
  const [formIsAccessible, setFormIsAccessible] = useState(false)

  useEffect(async () => {
    var isAccessible = await canFormBeFilled(userId, "Form_TD")
    setFormIsAccessible(isAccessible)
    var formData = await receiveFormData(userId, "Form_TD")
    setForm(formData)   
    setThesisTopic(formData.thesisName)
    setContentListData(formData);
  }, [])


  function setContentListData(formData) {
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
    ]

    setContentList(contentList);
  }

  async function submitFormData() {

    form["thesisName"] = thesisTopic;
    form["status"] = "Sent"
    form["formName"] = "Thesis Advisor and Topic Appointment Form"
    form["formId"] = "Form_TD"
    await Helper.setFormData(userId, form)
  }



  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 900,
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

  function getContentListView() {
    return (
      <div className='tnt-std-default-inputlar'>
        {contentList.map((varib) => (
          <div className='tnt-std-default-label' key={varib.content}>
            <p>{varib.label}</p>
            <TextField
              className='tnt-std-default-textfield name'
              defaultValue={varib.content}
              disabled
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position='start'>
                    <Lock />
                  </InputAdornment>
                ),
              }}
              rowsMax={4}
            />
          </div>
          
        ))}
        <div className='tnt-std-input'>
        <p className='tnt-std-input-header'>Thesis Topic</p>
        <TextField
          className='tnt-std-default-textfield name'
          id='standard-basic'
          disabled={!Boolean(formIsAccessible)}
          label=''
          value={thesisTopic}
          onChange={(event) => setThesisTopic(event.target.value)}
        />
      </div>
      </div>
    )
  }

  const modalView = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <p className='tnt-std-appointment-topic'>
          Thesis Advisor And Topic Appointment (Preview)
    </p>
        {Boolean(contentList) && getContentListView()}
        <div className='tnt-std-input'>
          <p className='tnt-std-input-header'>Thesis Topic</p>
          <TextField
            className='tnt-std-default-textfield name'
            id='standard-basic'
            disabled
            label=''
            value={thesisTopic}
            onChange={(event) => setThesisTopic(event.target.value)}
          />
        </div>

      </div>

      <Button
        onClick={() => {
          setOpenModal(false)
        }}
      >
        <p className='preview-button'>&lt; Back</p>
      </Button>
    </div>
  )
  return (
    <div className='thesis-advisor-and-topic-appointment'>
      <p className='tnt-std-appointment-topic'>
        Thesis Advisor And Topic Appointment
      </p>

      {Boolean(msgText) && <p className='tnt-std-appointment-topic'>
        {msgText}
      </p>}

      {Boolean(contentList) && getContentListView()}
      
      <div className='tnt-std-appointment-buttons'>
        <Button
          disabled={formIsAccessible}
          className='button preview'
          onClick={() => {
            setOpenModal(true)
          }}
        >
          <p style={{ fontWeight: 'Bold' }}>Preview</p>
        </Button>

        <Button className='button save'
          disabled={!formIsAccessible}
          onClick={() => {
            submitFormData(true)
          }}
        >
          <p style={{ fontWeight: 'Bold' }}>Submit</p>
        </Button>
      </div>
      <Modal
        open={modalIsOpen}
        onClose={!modalIsOpen}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {modalView}
      </Modal>

    </div>
  )
}
