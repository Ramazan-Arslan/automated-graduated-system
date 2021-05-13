import React, { useState, useEffect } from 'react'
import { Prompt } from 'react-router-dom'
import './select-an-advisor.component.css'
import MyTextField from '../textfield.component/mytextfield.component'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import SelectAdvisorCard from '../select-advisor-card.component/select-advisor-card.component'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import Helper from './select-an-advisor-helper'

async function selectAnAdvisor(studentId, selectedAdvisorId) {
  const result = await Helper.selectAnAdvisor(studentId, selectedAdvisorId)
  if (result === 'Success') {
    alert('Advisor is selected. Proposal is sent.')
    window.location.reload(true)
  } else {
    alert(result)
  }
}

function getList(studentObject) {
  var mycontentlist = [
    {
      label: 'Name Surname',
      content: studentObject.name + ' ' + studentObject.surname,
    },
    {
      label: 'Email',
      content: studentObject.email,
    },
    {
      label: 'Student ID',
      content: studentObject.id,
    },
  ]
  return mycontentlist
}

function getModalStyle() {
  const top = 50
  const left = 50
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 1150,
    height: 568,
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

const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
}

export default function SelectAdvisor() {
  var userId = localStorage.getItem('id')
  var userType = localStorage.getItem('type')

  const [advisorList, setAdvisorList] = useState([])
  const [userInfo, setUserInfo] = useState(Object)
  const [contentList, setContentList] = useState([])
  const [selectedAdvisor, setSelectedAdvisor] = useState(null)
  const [advisor, setAdvisor] = useState(null)
  const [isAccessible, setAccesibility] = useState(false)
  const [modalIsOpen, setOpenModal] = useState(false)

  const classes = useStyles()
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle)

  useEffect(async () => {
    var studentObject = await Helper.getStudentData(userId, userType)
    setAccesibility(!Boolean(studentObject?.advisor?.status))
    setUserInfo(studentObject)
    var advisorList = await Helper.getAdvisorsInfo(studentObject.department)
    setAdvisorList(advisorList)
    var gottenAdvisor = await Helper.getPreviewData(studentObject)
    setAdvisor(gottenAdvisor)
    setContentList(getList(studentObject))
  }, [])
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className='preview-select-advisor'>
        <p className='preview-title'>Select an Advisor (Preview)</p>
        <MyTextField myprops={contentList} />
        <div className='preview-advisor-card'>
          <p className='preview-selected-advisor'>Selected Advisor</p>
          {Boolean(advisor) && (
            <SelectAdvisorCard
              advisor={advisor}
              className='preview-advisorcard'
            />
          )}
        </div>
        <Button
          onClick={() => {
            setOpenModal(false)
          }}
        >
          <p className='preview-button'>&lt; Back</p>
        </Button>
      </div>
    </div>
  )

  return (
    <div className='select-advisor'>
      <p className='titlem'>Select Advisor</p>
      <MyTextField myprops={contentList} />
      <div className='advisor-selection'>
        <p className='advisor-selection-title' style={{ marginTop: '10px' }}>
          Select an Advisor
        </p>
        <div className='select-advisor-cards'>
          <List style={flexContainer}>
            {advisorList.map((tile) => (
              <ListItem
                key={tile.name}
                cols={tile.cols || 1}
                onClick={() => {
                  setSelectedAdvisor(Boolean(selectedAdvisor) ? null : tile)
                }}
              >
                <SelectAdvisorCard advisor={tile} />
              </ListItem>
            ))}
          </List>
          <br />
        </div>
      </div>
      <div className='buttons'>
        <Button
          className='button preview'
          disabled={isAccessible}
          onClick={() => {
            setOpenModal(true)
          }}
        >
          <p style={{ fontWeight: 'Bold' }}>Preview</p>
        </Button>

        <Button
          className='button save'
          disabled={!isAccessible}
          onClick={() => {
            selectAnAdvisor(userInfo?.id, selectedAdvisor?.id)
          }}
        >
          <p style={{ fontWeight: 'Bold' }}>Save Changes</p>
        </Button>

        <Prompt
          when={!Boolean(advisor) && Boolean(selectedAdvisor)}
          message='Changes are not saved. Want to leave?'
        />
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
