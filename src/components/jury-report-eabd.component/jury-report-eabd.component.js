import React, { useState } from 'react'
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

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
export default function JuryAppointmentFormByEABD() {
  const [modalIsOpen, setOpenModal] = useState(false)
  const [exam, setExam] = React.useState()
  const [examResult, setExamResult] = React.useState()
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2021-05-18T21:11:54')
  )

  const handleChange = (event) => {
    setExam(event.target.value)
  }
  const handleChange2 = (event) => {
    setExamResult(event.target.value)
  }

  const juryList = [
    {
      name: 'Bekir Yörük',
      institute: 'IZTECH',
      department: 'Computer Engineering',
    },
    {
      name: 'Bekir Yörük',
      institute: 'IZTECH',
      department: 'Computer Engineering',
    },
    {
      name: 'Bekir Yörük',
      institute: 'IZTECH',
      department: 'Computer Engineering',
    },
    {
      name: 'Bekir Yörük',
      institute: 'IZTECH',
      department: 'Computer Engineering',
    },
  ]

  let contentList = [
    {
      label: 'Name Surname',
      content: 'studentObject.name' + ' ' + 'studentObject.surname',
    },
    {
      label: 'Program',
      content: 'Master',
    },
    {
      label: 'Student ID',
      content: 'studentObject.id',
    },
    {
      label: 'Thesis Topic',
      content: 'studentObject.id',
    },
    {
      label: 'Advisor Name',
      content: 'studentObject.id',
    },
  ]
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
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <p className='jury-report-topic'>Thesis Defense Exam Jury Report</p>
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
        <div className='exam-situation-date'>
          <div className='jury-report-exam-checkboxes'>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>Exam was held</FormLabel>
              <RadioGroup
                aria-label='examwasheld'
                name='examwasheld1'
                value={exam}
                onChange={handleChange}
              >
                <FormControlLabel
                  value='face'
                  control={<Radio />}
                  label='Face to Face'
                />
                <FormControlLabel
                  value='online'
                  control={<Radio />}
                  label='Online'
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <p>Selected Date</p>
          </div>
        </div>
        <div className='jury-table-result'>
          <div className='jury-report-table-content'>
            {juryList.map((jury) => (
              <div key={jury.name}>
                <TextField
                  className='jury-report-table-textfield'
                  defaultValue={jury.name}
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
                <TextField
                  className='jury-report-table-textfield'
                  defaultValue={jury.institute}
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
                <TextField
                  className='jury-report-table-textfield'
                  defaultValue={jury.department}
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

          <div className='jury-report-result-checkboxes'>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>Select Exam Result</FormLabel>
              <RadioGroup
                aria-label='examresult'
                name='examresult1'
                value={examResult}
                onChange={handleChange2}
              >
                <FormControlLabel
                  value='accepted'
                  control={<Radio />}
                  label='Accepted'
                />
                <FormControlLabel
                  value='rejected'
                  control={<Radio />}
                  label='Rejected'
                />
                <FormControlLabel
                  value='correction'
                  control={<Radio />}
                  label='Correction'
                />
              </RadioGroup>
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
  const handleDateChange = (date) => {
    setSelectedDate(date)
  }
  return (
    <div className='jury-report-by-eabd'>
      <p className='jury-report-topic'>Thesis Defense Exam Jury Report</p>
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
      <div className='exam-situation-date'>
        <div className='jury-report-exam-checkboxes'>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Exam was held</FormLabel>
            <RadioGroup
              aria-label='examwasheld'
              name='examwasheld1'
              value={exam}
              onChange={handleChange}
            >
              <FormControlLabel
                value='face'
                control={<Radio />}
                label='Face to Face'
              />
              <FormControlLabel
                value='online'
                control={<Radio />}
                label='Online'
              />
            </RadioGroup>
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
        <div className='jury-report-table-content'>
          {juryList.map((jury) => (
            <div key={jury.name}>
              <TextField
                className='jury-report-table-textfield'
                defaultValue={jury.name}
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
              <TextField
                className='jury-report-table-textfield'
                defaultValue={jury.institute}
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
              <TextField
                className='jury-report-table-textfield'
                defaultValue={jury.department}
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

        <div className='jury-report-result-checkboxes'>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Select Exam Result</FormLabel>
            <RadioGroup
              aria-label='examresult'
              name='examresult1'
              value={examResult}
              onChange={handleChange2}
            >
              <FormControlLabel
                value='accepted'
                control={<Radio />}
                label='Accepted'
              />
              <FormControlLabel
                value='rejected'
                control={<Radio />}
                label='Rejected'
              />
              <FormControlLabel
                value='correction'
                control={<Radio />}
                label='Correction'
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className='jury-report-buttons'>
        <Button
          className='button preview'
          onClick={() => {
            setOpenModal(true)
          }}
        >
          <p style={{ fontWeight: 'Bold' }}>Preview</p>
        </Button>

        <Button className='button save'>
          <p style={{ fontWeight: 'Bold' }}>Save Changes</p>
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
    </div>
  )
}
