import React, { useState, useEffect } from 'react'
import './thesis-submission.component.css'
import MyTextField from '../textfield.component/mytextfield.component'
import { Button } from '@material-ui/core'
import { DropzoneArea, DropzoneDialog } from 'material-ui-dropzone'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import Helper from './thesis-submission-helper.component'


async function receiveThesisData(studentId) {
  var thesis = await Helper.getThesisData(studentId);
  return thesis
}

async function canThesisReachable(studentId) {
  var thesisStatus = await Helper.getThesisStatus(studentId);
  if (Boolean(thesisStatus)) {
    return true
  }
  return false
}


async function receiveFormData(studentId, formId) {
  var formObject = await Helper.getFormData(studentId, formId)
  return formObject
}



export default function ThesisSubmission() {

  var userId = localStorage.getItem('id')
  var userType = localStorage.getItem('type')
  const [user, setUser] = useState({ id: "", type: "" })
  const [student, setStudent] = useState({ id: "" })
  const [thesis, setThesis] = useState(null)
  const [contentList, setContentList] = useState(null)
  const [isThesisExist, setThesisExist] = useState(false)
  const [modalIsOpen, setOpenModal] = useState(false)
  const [dropzoneOpen, setDropzoneOpen] = useState(false)

  useEffect(async () => {
    setUser({ id: userId, type: userType })
    setStudent({ id: userId })
    var formData = await receiveFormData(userId, "Form_TS")
    var thesisData = await receiveThesisData(userId)
    setThesis([thesisData])
    var thesisStatus = await canThesisReachable(userId)
    setThesisExist(thesisStatus)
    if (Boolean(formData)) {
      setContentListData(formData);
    }

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
      {
        label: 'Thesis Topic',
        content: formData.thesisName
      },
    ]

    setContentList(contentList);
  }

  async function uploadThesisButton() {
    await Helper.setThesisFile(student.id, thesis[0])
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 1150,
      height: 'auto',
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
        {Boolean(contentList) && <MyTextField myprops={contentList} />}
        <div className='input-file'>
          <p className='thesis-submission-upload'>Thesis Submission</p>
          <DropzoneArea
            initialFiles={thesis}
            onDelete={() => null}
            showPreviewsInDropzone
            showFileNames
            dropzoneText={false}
            maxFileSize={5000000}
           
          />
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
      {Boolean(contentList) && <MyTextField myprops={contentList} />}
      {!isThesisExist && <div className='input-file'>
        <p className='thesis-submission-upload'>Thesis Submission</p>
        <DropzoneArea
          onChange={(file) => setThesis(file)}
          acceptedFiles={['application/pdf']}
          filesLimit={1}
          initialFiles={thesis}
          showPreviewsInDropzone
          showFileNames
          maxFileSize={5000000}
        />

      </div>}
      <div className='thesis-submission-buttons'>
        <Button
          className='button preview'
          disabled={!isThesisExist}
          onClick={() => {
            setOpenModal(true)
          }}
        >
          <p style={{ fontWeight: 'Bold' }}>Preview</p>
        </Button>

        <Button
          className='button save'
          disabled={isThesisExist}
          onClick={uploadThesisButton}>
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
