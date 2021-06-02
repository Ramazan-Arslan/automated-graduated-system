import React, { useState } from 'react'
import './thesis-advisor-and-topic-appointment-by-eabd.component.css'
import MyTextField from '../textfield.component/mytextfield.component'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'

export default function ThesisAdvisorAndTopicAppointmentByEabd() {
  const [modalIsOpen, setOpenModal] = useState(false)
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

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <p className='tnt-appointment-topic'>
          Thesis Advisor And Topic Appointment
        </p>
        <MyTextField myprops={contentList} />
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
    <div className='thesis-advisor-and-topic-appointment-by-eabd'>
      <p className='tnt-appointment-topic'>
        Thesis Advisor And Topic Appointment
      </p>
      <div className='tnt-eabd-default-values'>
        <MyTextField myprops={contentList} />
      </div>
      <div className='tnt-appointment-buttons'>
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
