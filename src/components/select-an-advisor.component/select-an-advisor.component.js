import React, { useState, useEffect } from 'react'
import './select-an-advisor.component.css'
import MyTextField from '../textfield.component/mytextfield.component'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import UserController from '../../controllers/UserController'
import SelectAdvisorCard from '../select-advisor-card.component/select-advisor-card.component'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'



async function getStudentData(userId, userType) {
  const userController = new UserController()
  const obj = await userController.takeUserInfo(userId, userType)
  if (Boolean(obj.name)) {
    return obj
  } else {
    return { name: 'Error', surname: 'Error' }
  }
}
async function getAdvisorsInfo(userDepartment) {
  const userController = new UserController()
  const advisorsList = await userController.takeDepartmentAdvisors(
    userDepartment
  )
  if (Boolean(advisorsList[0])) {
    return advisorsList
  } else {
    return []
  }
}

async function selectAnAdvisor(studentId, selectedAdvisorId) {
  const userController = new UserController()
  const resultMessage = await userController.submitStudentProposal(
    studentId,
    selectedAdvisorId
  )
  if (resultMessage === 'Proposal is sent') {
    alert(resultMessage)
    window.location.reload(true)
  } else {
    alert(resultMessage)
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

async function getPreviewData(studentObject) {
  const userController = new UserController()
  var advisorId = studentObject?.advisor?.advisorId
  var advisorObject = null
  if (Boolean(advisorId)) {
    var url = 'user/advisor/' + advisorId
    advisorObject = await userController.takeSpecificUserInfo(url)
  }
  return advisorObject
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
    }
  })
}))

const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
};

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
    var studentObject = await getStudentData(userId, userType)
    setAccesibility(!Boolean(studentObject?.advisor?.status))
    setUserInfo(studentObject)
    var advisorList = await getAdvisorsInfo(studentObject.department)
    setAdvisorList(advisorList)
    var gottenAdvisor = await getPreviewData(studentObject)
    setAdvisor(gottenAdvisor)
    setContentList(getList(studentObject))
  }, [])

  //console.log(advisor)
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className='preview-select-advisor'>
        <p className='preview-title'>Select an Advisor (Preview)</p>
        <MyTextField myprops={contentList} />
        <div className='preview-advisor-card'>
          <p className='preview-selected-advisor'>Selected Advisor</p>
          {Boolean(advisor) && <SelectAdvisorCard advisor={advisor} className='preview-advisorcard'/>}
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
  const naber = {
    control: base => ({
      ...base,
      border: '2px solid red',
      // This line disable the blue border
      boxShadow: 'none'
    })
  };

  return (
    <div className='select-advisor'>
      <p className='titlem' >Select Advisor</p>
      <MyTextField myprops={contentList} />
      <div className="advisor-selection">
          <p className="advisor-selection-title" style={{ marginTop:'10px',}}>Select an Advisor</p>
          <div className="select-advisor-cards" >
        <List style={flexContainer}
        >
          {advisorList.map((tile) => (
            <ListItem 
              
              key={tile.name}
              cols={tile.cols || 1}
              onClick={() => {
                setSelectedAdvisor(tile);
              }}
            >
              <SelectAdvisorCard  
                advisor={tile} 
                />
      
            </ListItem>
          ))}
        </List>
        <br/>
        </div>
      </div>
      <div className="buttons">
          <Button
            className="button preview"
            disabled={isAccessible}
            onClick={() => {
              setOpenModal(true)
            }}
          >
            <p style={{ fontWeight: 'Bold' }}>Preview</p>
          </Button>
          
          <Button
            className="button save"
            disabled={!isAccessible}
            onClick={() => {
              selectAnAdvisor(userInfo?.id, selectedAdvisor?.id)
            }}
          >
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
