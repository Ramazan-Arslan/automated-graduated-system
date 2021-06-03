import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import './jury-report-eabd.component.css'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Lock from '@material-ui/icons/Lock'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Grid from '@material-ui/core/Grid'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers'
import Helper from './jury-report-eabd-helper.component'


var msgText = ""

async function canFormBeFilled(studentId, formId) {
  var isFormTJAccepted = await Helper.isFormTJAccepted(studentId)
  if (!isFormTJAccepted) {
    msgText += "Form TJ is not accepted for : " + studentId + ". So you can not fill in this form."
  }
  var canFormBeFilled = await Helper.isFormAccessible(studentId, formId)
  return isFormTJAccepted && canFormBeFilled;
}


async function receiveFormData(studentId, formId) {
  var formTJObject = await Helper.getFormData(studentId, "Form_TJ")
  var formObject = await Helper.getFormData(studentId, formId)
  if (!Boolean(formObject)) {
    return formTJObject
  }
  return formObject
}





export default function JuryReportFormByEABD() {
  var userId = localStorage.getItem('id')
  var userType = localStorage.getItem('type')
  var formStudentId = localStorage.getItem('FormStudentId')
  const [user, setUser] = useState({ id: "", type: "" })
  const [studentId, setStudentId] = useState("")
  const [form, setForm] = useState(null)
  const [contentList, setContentList] = useState(null)
  const [formIsAccessible, setFormIsAccessible] = useState(false)
  const [modalIsOpen, setOpenModal] = useState(false)
  const [juryList, setJuryList] = useState([])
  const [examType, setExamType] = useState(null)
  const [examResult, setExamResult] = useState(null)
  const [selectedDate, setSelectedDate] = useState( null)

  useEffect(async () => {
    setUser({ id: userId, type: userType })
    setStudentId(formStudentId)
    var isAccessible = await canFormBeFilled(formStudentId, "Form_TS")
    setFormIsAccessible(isAccessible)
    var formData = await receiveFormData(formStudentId, "Form_TS")
    setForm(formData)
    if (Boolean(formData)) {
      setContentListData(formData);
      adjustJuryList(formData.juryList)
      setExamType(formData?.examType)
      setExamResult(formData?.examResult)
      setSelectedDate(Boolean(formData.examDate) ? formData.examDate : new Date())
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
    ]

    setContentList(contentList);


  }


  const handleExamTypeChange = (event) => {
    setExamType(event.target.value)
  }
  const handleExamResultChange = (event) => {
    setExamResult(event.target.value)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  async function submitFormData() {
    form["formName"] = "hesis Defense Exam Jury Report Form"
    form["formId"] = "Form_TS"
    form["examResult"] = examResult
    form["examType"] = examType
    form["examDate"] = selectedDate?.getTime()
    await Helper.setFormData(studentId, form)
  }


  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 1150,
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

  function getFormControlLabelView(value) {
    return (
      <FormControlLabel
        value={value}
        control={<Radio />}
        label={value}
      />
    )
  }

  function getExamResultCheckboxesView() {
    return (
      <RadioGroup
        aria-label='examresult'
        name='examresult1'
        value={examResult}
        onChange={handleExamResultChange}
      >
        {getFormControlLabelView("Accepted")}
        {getFormControlLabelView("Rejected")}
        {getFormControlLabelView("Correction")}
      </RadioGroup>
    )
  }

  function getExamTypeCheckboxesView() {
    return (
      <RadioGroup
        aria-label='examwasheld'
        name='examwasheld1'
        value={examType}
        onChange={handleExamTypeChange}
      >
        {getFormControlLabelView("Face to Face")}
        {getFormControlLabelView("Online")}
      </RadioGroup>
    )
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <p className='jury-report-topic'>Thesis Defense Exam Jury Report</p>
        {Boolean(contentList) && getContentListView()}
        <div className='exam-situation-date'>
          <div className='jury-report-exam-checkboxes'>
            <FormControl component='fieldset' disabled>
              <FormLabel component='legend'>Exam was held</FormLabel>
              {getExamTypeCheckboxesView()}
            </FormControl>
          </div>
       
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify='space-around'>
                <KeyboardDatePicker
                  disableToolbar
                  disabled
                  variant='inline'
                  format='MM/dd/yyyy'
                  margin='normal'
                  id='date-picker-inline'
                  label='Date'
                  value={new Date(form?.examDate)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
        </div>
        <div className='jury-table-result'>
          {getJuryListView()}

          <div className='jury-report-result-checkboxes'>
            <FormControl component='fieldset' disabled >
              <FormLabel component='legend'>Exam Result</FormLabel>
              {getExamResultCheckboxesView()}
            </FormControl>
          </div>
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

  function getContentListView() {
    return (
      <div className='jury-report-default-inputlar'>
        {contentList.map((varib) => (
          <div className='jury-report-default-label' key={varib.content}>
            <p>{varib.label}</p>
            <TextField
              className='jury-report-default-textfield name'
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
      </div>
    )
  }

  function getTextView(defaultValue, disabled) {
    return (
      <TextField
        className='jury-report-table-textfield'
        defaultValue={defaultValue}
        disabled={disabled}
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
      <div className='jury-report-table-content'>
        {juryList.map((jury) => (
          <div key={jury.name}>
            {getTextView(jury.name, true)}
            {getTextView(jury.institute, true)}
            {getTextView(jury.department, true)}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='jury-report-by-eabd'>
      {Boolean(msgText) && <p className='tnt-std-appointment-topic'>
        {msgText}
      </p>}

      {!Boolean(msgText) && <div>
        <p className='jury-report-topic'>Thesis Defense Exam Jury Report</p>
        {Boolean(contentList) && getContentListView()}
        <div className='exam-situation-date'>
          <div className='jury-report-exam-checkboxes'>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>Exam was held</FormLabel>
              {getExamTypeCheckboxesView()}
            </FormControl>
          </div>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify='space-around'>
                <KeyboardDatePicker
                  disableToolbar
                  variant='inline'
                  format='MM/dd/yyyy'
                  margin='normal'
                  id='date-picker-inline'
                  label='Select Date'
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
        </div>
        <div className='jury-table-result'>

          {getJuryListView()}
          <div className='jury-report-result-checkboxes'>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>Select Exam Result</FormLabel>
              {getExamResultCheckboxesView()}
            </FormControl>
          </div>
        </div>


        <div className='jury-report-buttons'>
          <Button
            className='button preview'
            disabled={formIsAccessible}
            onClick={() => {
              setOpenModal(true)
            }}
          >
            <p style={{ fontWeight: 'Bold' }}>Preview</p>
          </Button>

          <Button className='button save'  disabled={!formIsAccessible} onClick={() => submitFormData()}>
            <p style={{ fontWeight: 'Bold' }}>Publish</p>
          </Button>
        </div>
        <Modal
          open={modalIsOpen}
          onClose={!modalIsOpen}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
        >
          {body}
        </Modal>
      </div>}
    </div>
  )
}
