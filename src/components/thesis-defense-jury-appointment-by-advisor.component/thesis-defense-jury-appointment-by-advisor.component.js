import React, { useState, useEffect } from 'react'
import './thesis-defense-jury-appointment-by-advisor.component.css'
import { Prompt } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import Lock from '@material-ui/icons/Lock'
import InputAdornment from '@material-ui/core/InputAdornment'
import Modal from '@material-ui/core/Modal'
import Helper from './thesis-defense-jury-appointment-by-advisor-helper.component'

var msgText = ""

async function canFormBeFilled(studentId, formId) {
  var isFormTDAccepted = await Helper.isFormTDAccepted(studentId)
  if(!isFormTDAccepted)
  {
    msgText += "Form TD is not accepted for : " + studentId + ". So you can not fill in this form."
  }
  var canFormBeFilled = await Helper.isFormAccessible(studentId, formId)
  return isFormTDAccepted && canFormBeFilled;
}

async function receiveFormData(studentId, formId) {

  var studentObject = await Helper.getStudentData(studentId)
  var advisorObject = await Helper.getAdvisorData(studentId)
  var formObject = await Helper.getFormData(studentId, formId)
  var thesisName = await Helper.getThesisName(studentId)

  var json = {
    studentName: studentObject.name,
    studentSurname: studentObject.surname,
    studentId: studentObject.id,
    program: "Master",
    advisorName: advisorObject.name,
    advisorSurname: advisorObject.surname,
    thesisName: thesisName,
    juryList: formObject?.juryList
  }

  return json
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
  const [modalIsOpen, setOpenModal] = useState(false)
  const [state, setState] = useState({
    name: '',
    institute: '',
    department: '',
  })
  const [juryList, setJuryList] = useState([])

  useEffect(async () => {
    setUser({ id: userId, type: userType })
    setStudentId(formStudentId)
    var formData = await receiveFormData(formStudentId, "Form_TJ")
    setForm(formData)
    var isAccessible = await canFormBeFilled(formStudentId, "Form_TJ")
    setFormIsAccessible(isAccessible)
    setContentListData(formData);
    adjustJuryList(formData.juryList)
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

  async function submitFormData() {

    form["status"] = "Sent"
    form["formName"] = "Thesis Defense Jury Appointment Form"
    form["formId"] = "Form_TJ"
    form["juryList"] = juryList
    await Helper.setFormData(studentId, form)
  }


  function handleChange(evt) {
    const value = evt.target.value
    setState({
      ...state,
      [evt.target.name]: value,
    })
  }



  function addJury() {
    if(!controlJuryData())
    {
      let jury = {
        name: state.name,
        institute: state.institute,
        department: state.department,
      }
      setJuryList((juryList) => [...juryList, jury])
    }
  }

  function controlJuryData()
  {
    var hasInvalidInput = Helper.hasInvalidInput(state) 
    var hasEmptyInput = Helper.hasEmptyInput(state);

    return hasInvalidInput || hasEmptyInput
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
      }
    ]

    setContentList(contentList);
  }



  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    paper: {
      position: 'absolute',
      width: 1000,
      height: 600,
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

  const classes = useStyles()
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
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h1 className='thesis-defense-preview-title'>
        Thesis Defense Jury Appoinment(Preview)
      </h1>
      <div className='thesis-defense-preview-content'>
        {Boolean(contentList) && <div className='default-inputlar'>
          {getContentListView()}
        </div>}
        {getJuryListView()}
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
    <div className='jury-appoinment-by-advisor'>
      <h1 className='thesis-defense-header'>Thesis Defense Jury Appoinment</h1>
      {Boolean(msgText) && <p className='tnt-std-appointment-topic'>
        {msgText}
      </p>}
      <div className='jury-appointment-content'>
        {Boolean(contentList) && !Boolean(msgText) && <div className='default-inputlar'>
          {getContentListView()}

        </div>}
        {formIsAccessible && !Boolean(msgText) && <div className='jury-adding'>
          <div className='add-jury'>
            <form className={classes.root} noValidate autoComplete='off'>
              <ul className='add-jury-ul'>
                <li>
                  <TextField
                    id='standard-basic'
                    label='Jury Name & Surname'
                    name='name'
                    value={state.name}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <TextField
                    id='standard-basic'
                    label='Institute Name'
                    name='institute'
                    value={state.institute}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <TextField
                    id='standard-basic'
                    label='Department'
                    name='department'
                    value={state.department}
                    onChange={handleChange}
                  />
                </li>
              </ul>
            </form>

            <Button className='add-button' color='secondary' variant='contained' onClick={addJury}>ADD</Button>
          </div>

        </div>}

      </div>
   
      <div className='table'>
            {getJuryListView()}
            </div>
           
      {!Boolean(msgText) && <div className='jury-appointment-buttons'>
        <Button className='button ' disabled={!formIsAccessible} onClick={() => submitFormData()}>
          <p style={{ fontWeight: 'Bold' }}>PUBLISH</p>
        </Button>

        <Button
          className='button preview'
          disabled={formIsAccessible}
          onClick={() => {
            setOpenModal(true)
          }}
        >
          <p style={{ fontWeight: 'Bold' }}>PREVIEW</p>
        </Button>
      </div>}

      <Prompt
          when={Boolean(juryList) || (Boolean(state.name) || Boolean(state.institute) || Boolean(state.department))}
          message='Changes are not saved. Want to leave?'
        />

      <Modal
        open={modalIsOpen}
        onClose={!modalIsOpen}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </div>
  )
}
