import React, { useState } from 'react'
import './thesis-submission.component.css'
import MyTextField from '../textfield.component/mytextfield.component'
import { Button } from '@material-ui/core'
import { DropzoneArea } from 'material-ui-dropzone'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'

export default function ThesisSubmission() {
  const [modalIsOpen, setOpenModal] = useState(false)

  let contentList = [
    {
      label: 'Name Surname',
      content: 'studentObject.name' + ' ' + 'studentObject.surname',
    },
    {
      label: 'Email',
      content: 'studentObject.email',
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
        <p className='thesis-submission-topic'>Thesis Submission (Preview)</p>
        <MyTextField myprops={contentList} />
        <div className='input-file'>
          <p className='thesis-submission-upload'>Thesis Submission</p>
          <DropzoneArea />
        </div>
        <div className='thesis-submission-buttons'></div>
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
    <div className='thesis-submission'>
      <p className='thesis-submission-topic'>Thesis Submission</p>
      <MyTextField myprops={contentList} />
      <div className='input-file'>
        <p className='thesis-submission-upload'>Thesis Submission</p>
        <DropzoneArea />
      </div>
      <div className='thesis-submission-buttons'>
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
