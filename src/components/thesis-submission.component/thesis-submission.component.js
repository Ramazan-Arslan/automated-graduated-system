import React, { useState, useEffect } from 'react'
import './thesis-submission.component.css'
import { Prompt } from 'react-router-dom'
import MyTextField from '../textfield.component/mytextfield.component'
import { Button } from '@material-ui/core'
import { DropzoneArea, DropzoneDialog } from 'material-ui-dropzone'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import Helper from './thesis-submission-helper.component'


async function receiveThesisData(studentId) {
  var thesis = await Helper.getThesisData(studentId);
  console.log(thesis)
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
  const [isThesisCanBeFilled, setThesisCanBeFilled] = useState(false)
  const [modalIsOpen, setOpenModal] = useState(false)
  const [dropzoneOpen, setDropzoneOpen] = useState(false)
  const [thesisUrl, setThesisUrl] = useState("")

  useEffect(async () => {
    setUser({ id: userId, type: userType })
    setStudent({ id: userId })
    var formData = await receiveFormData(userId, "Form_TS")
    var thesisData = await receiveThesisData(userId)
    if(Boolean(thesisData))
    {
      setThesis([thesisData[0]])
      setThesisUrl(thesisData[1])
    }

    setThesisCanBeFilled(formData?.status === "Accepted")
    var thesisStatus = await canThesisReachable(userId)
    console.log(thesisStatus)
    setThesisExist(thesisStatus)
    if (Boolean(formData)) {
      setContentListData(formData);
    }

  }, [])


  function setContentListData(formData) {

    console.log(thesis)
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
    await Helper.setThesisFile(student.id, Boolean(thesis) ? thesis[0]:null)
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

  const downloadThesis = (
    <div className='download-thesis'>
      <Button
            className='button preview'
            disabled={!Boolean(thesisUrl)}
            onClick={() => {
              window.location.href = thesisUrl
            }}
        >
          <p style={{ fontWeight: 'Bold' }}>{"Download file"} </p>
      </Button>
    </div>
  )
 

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <p className='thesis-submission-topic'>Thesis Submission (Preview)</p>
        {Boolean(contentList) && <MyTextField myprops={contentList} />}
        {Boolean(thesis) && <div className='input-file'>
          <p className='thesis-submission-upload'>Thesis Submission</p>
          <Button
            className='button preview'
            disabled={!Boolean(thesisUrl)}
            onClick={() => {
              window.location.href = thesisUrl
            }}
          >
            <p style={{ fontWeight: 'Bold' }}>{"Download file :"+ thesis[0].name} </p>
          </Button>
        </div>}
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
       {!isThesisCanBeFilled && <div>
        <p className='thesis-submission-topic'>Form TS is not submitted by EABD. So you cannot submit your thesis</p>
         </div>}
      {isThesisCanBeFilled && <div>
      <p className='thesis-submission-topic'>Thesis Submission</p>
      {Boolean(contentList) && <MyTextField myprops={contentList} />}
      {isThesisExist && downloadThesis}
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

      <Prompt
          when={Boolean(thesis) && !isThesisCanBeFilled}
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
      </div>}
    </div>
  )
}
