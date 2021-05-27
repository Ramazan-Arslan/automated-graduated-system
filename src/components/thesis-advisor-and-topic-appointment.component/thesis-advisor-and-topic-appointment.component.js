import React, { useState } from 'react'
import './thesis-advisor-and-topic-appointment.component.css'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Lock from '@material-ui/icons/Lock'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'

export default function ThesisAdvisorAndTopicAppointment() {
  const [modalIsOpen, setOpenModal] = useState(false)
  const [thesisTopic, setThesisTopic] = useState('')
  let contentList = [
    {
      label: 'Name Surname',
      content: 'studentObject.name' + ' ' + 'studentObject.surname',
    },
    {
      label: 'Student ID',
      content: 'studentObject.id',
    },
    {
      label: 'Advisor Name',
      content: 'studentObject.id',
    },
    {
      label: 'Program',
      content: 'Master',
    },
  ]

  let contentListUpdated = [
    {
      label: 'Name Surname',
      content: 'studentObject.name' + ' ' + 'studentObject.surname',
    },
    {
      label: 'Student ID',
      content: 'studentObject.id',
    },
    {
      label: 'Advisor Name',
      content: 'studentObject.id',
    },
    {
      label: 'Thesis Topic',
      content: 'studentObject.id',
    },
    {
      label: 'Program',
      content: 'Master',
    },
  ]
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

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <p className='tnt-std-appointment-topic'>
          Thesis Advisor And Topic Appointment (Preview)
        </p>
        <div className='tnt-std-default-inputlar'>
          {contentListUpdated.map((varib) => (
            <div className='default-label' key={varib.content}>
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
      </div>
      <div className='tnt-std-input'>
        <p className='tnt-std-input-header'>Thesis Topic</p>
        <TextField
          className='tnt-std-default-textfield name'
          id='standard-basic'
          label=''
          value={thesisTopic}
          onChange={(event) => setThesisTopic(event.target.value)}
        />
      </div>
      <div className='tnt-std-appointment-buttons'>
        <Button
          className='button preview'
          onClick={() => {
            setOpenModal(true)
          }}
        >
          <p style={{ fontWeight: 'Bold' }}>Preview</p>
        </Button>

        <Button className='button save'>
          <p style={{ fontWeight: 'Bold' }}>Submit</p>
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
