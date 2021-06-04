import React, { useState, useEffect } from 'react'
import './thesis-defense-jury-appointment-by-eabd.component.css'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import Lock from '@material-ui/icons/Lock'
import InputAdornment from '@material-ui/core/InputAdornment'
import Helper from './thesis-defense-jury-appointment-by-eabd-helper.component'


async function receiveFormData(studentId, formId) {
  var formObject = await Helper.getFormData(studentId, formId)
  return formObject
}



export default function JuryAppointmentByAdvisor() {
  var userId = localStorage.getItem('id')
  var userType = localStorage.getItem('type')
  var formStudentId = localStorage.getItem('FormStudentId')
  const [user, setUser] = useState({ id: "", type: "" })
  const [studentId, setStudentId] = useState("")
  const [form, setForm] = useState(null)
  const [contentList, setContentList] = useState(null)
  const [formIsAccessible, setFormIsAccessible] = useState(false)
  const [juryList, setJuryList] = useState([])

  useEffect(async () => {
    setUser({ id: userId, type: userType })
    setStudentId(formStudentId)
    var formData = await receiveFormData(formStudentId, "Form_TJ")
    setForm(formData)
    if (Boolean(formData)) {
      setFormIsAccessible(formData?.status === "Sent")
      setContentListData(formData);
      adjustJuryList(formData.juryList)
    }

  }, [])


  function adjustJuryList(juries) {
    if (Boolean(juries)) {
      Object.values(juries).map(juryJson => {
        let jury = {
          name: juryJson.name,
          institute: juryJson.institute,
          department: juryJson.department,
        }
        setJuryList((juryList) => [...juryList, jury])
      })
    }

  }

  async function decisionButton(result) {
    if (result === "Accept") {
      await Helper.setFormStatus(studentId, "Form_TJ", "Accepted")
    }
    else if (result === "Reject") {
      await Helper.setFormStatus(studentId, "Form_TJ", "Rejected")
    }
  }



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
      {
        label: 'Thesis Name',
        content: formData.thesisName
      },
      {
        label: 'Status',
        content: formData.status
      }
    ]

    setContentList(contentList);


  }

  function getTextFieldView(defaultValue) {
    return (
      <TextField
        className='table-textfield'
        defaultValue={defaultValue}
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
    )
  }

  function getJuryListView() {
    return (
      <div className='table-content'>
        {juryList.map((jury, index) => (
          <div key={index}>
            {getTextFieldView(jury.name)}
            {getTextFieldView(jury.institute)}
            {getTextFieldView(jury.department)}
          </div>
        ))}
      </div>
    )
  }

  function getContentListView() {
    return (

      contentList.map((varib) => (
        <div className='default-label' key={varib.content}>
          <p>{varib.label}</p>
          {getTextFieldView(varib.content)}
        </div>
      ))

    )
  }


  return (
    <div>
      {!Boolean(form) &&
        <div className='jury-appoinment-by-eabd'>
          <p className='jury-appoinment-by-eabd'>
            {"Form is not submitted for student : " + studentId}
          </p>
        </div>
      }

      {Boolean(form) && <div className='jury-appoinment-by-eabd'>
        <h1 className='thesis-defense-header'>Thesis Defense Jury Appoinment</h1>

        <div className='jury-appointment-content'>
          {Boolean(contentList) && <div className='default-inputlar'>
            {getContentListView()}

          </div>}
        </div>

        <div className='table'>
          {getJuryListView()}
        </div>

        <div className='jury-appointment-buttons'>
          <Button className='button ' disabled={!formIsAccessible} onClick={() => decisionButton("Accept")}>
            <p style={{ fontWeight: 'Bold' }}>Accept</p>
          </Button>

          <Button
            className='button preview'
            disabled={!formIsAccessible}
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
