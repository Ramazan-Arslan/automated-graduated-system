import React, { useState, useEffect } from 'react'
import './student-approval.component.css'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import '../approval-request-card.component/approval-request-card.component.css';
import { Avatar, Button } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import Helper from './student-approval-helper';

/*
async function getStudentsInfo(advisorId) {
  const userController = new UserController()
  const studentList = await userController.takeStudentProposals(advisorId)
  if (Array.isArray(studentList)) {
    return studentList;
  } else {
    return []
  }
}*/
/*
async function submitProposalDecisions(advisorId, acceptedList, rejectedList) {
  const userController = new UserController()
  const result = await userController.submitProposalDecisions(advisorId, acceptedList, rejectedList)
  if (result.length > 0) {
    alert("Succesfull.")
    window.location.reload(true)
  }
  else {
    alert("Some data are not set.")
  }
}*/


/*
async function getPreviewData(advisorId) {
  const userController = new UserController()
  const proposals = await userController.takeDecidedProposals(advisorId);

  if (Array.isArray(proposals)) {
    return proposals;
  } else {
    return []
  }
}*/

async function submitProposalDecisions(advisorId, acceptedList, rejectedList) {
  const result = await Helper.submitProposalDecisions(advisorId, acceptedList, rejectedList)
  if (result === "Succesfull") {
    alert("Succesfull.")
    window.location.reload(true)
  }
  else {
    alert("Some data are not set.")
  }
}


export default function StudentApproval() {

  var userId = localStorage.getItem('id')
  var userType = localStorage.getItem('type')
  const [studentList, setStudentList] = useState([])
  const [acceptedList, setAcceptedList] = useState([])
  const [rejectedList, setRejectedList] = useState([])
  const [previewData, setPreviewData] = useState([])
  const [modalIsOpen, setOpenModal] = useState(false)

  useEffect(async () => {
    var list = await Helper.getStudentsInfo(userId);
    setStudentList(list);
    var data = await Helper.getPreviewData(userId, acceptedList, rejectedList);
    setPreviewData(data);

  }, [])

  function removeStudentCard(student, list, setList) {
    var updatedList = list.filter((item) => item.name !== student.name)
    setList(updatedList)
  }



  function getItemView(student, text) {
    return (
      <div className='approval-request'>
        <div>
          <Avatar alt='Remy Sharp' src='/broken-image.jpg' className='userAvatar'>
            {student.name.charAt(0)}
          </Avatar>
        </div>
        <div className='requester-info'>
          <p className='requester-name'>{student.name + " " + student.surname}</p>
          <p className='requester-department'>{student.department}</p>
        </div>
        {text === "Proposals" && <div className='decide-buttons'>
          <Button className='decide accept'
            onClick={() => { acceptedList.push(student); var method = setStudentList; removeStudentCard(student, studentList, method) }} >Accept</Button>

          <Button className='decide reject'
            onClick={() => { rejectedList.push(student); var method = setStudentList; removeStudentCard(student, studentList, method) }} >Reject</Button>
        </div>}

        {text === "Accepted Proposals" && <div className='decide-buttons'>
          <Button className='decide accept'
            onClick={() => { studentList.push(student); var method = setAcceptedList; removeStudentCard(student, acceptedList, method) }} >Undo</Button>
        </div>}

        {text === "Rejected Proposals" && <div className='decide-buttons'>
          <Button className='decide accept'
            onClick={() => { studentList.push(student); var method = setRejectedList; removeStudentCard(student, rejectedList, method) }} >Undo</Button>
        </div>}
      </div>
    );
  }

  function getListView(text, list) {
    return (
      <div>
        <h1>{text}</h1>
        <List style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
        }}>
          {list.map((tile) => (

            <ListItem
              key={tile.name}
              cols={tile.cols || 1}>

              {getItemView(tile, text)}
            </ListItem>
          ))}
        </List>
      </div>
    )
  }



  function getPreviewView(list) {

    return (
      <div>
        <List style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
        }}>
          {list.map((tile) => (

            <ListItem
              key={tile.student.id}
              cols={tile.cols || 1}>

              <div className='approval-request'>
                <div>
                  <Avatar alt='Remy Sharp' src='/broken-image.jpg' className='userAvatar'>
                    {tile.student.name.charAt(0)}
                  </Avatar>
                </div>
                <div className='requester-info'>
                  <p className='requester-name'>{tile.student.name + " " + tile.student.surname}</p>
                  <p className='requester-department'>{tile.student.department}</p>
                </div>
                <h1>{tile.status}</h1>
              </div>
            </ListItem>
          ))}
        </List>

        <Button
          onClick={() => {
            setOpenModal(false)
          }}
        >
          <p className='preview-button'>&lt; Back</p>
        </Button>
      </div>
    )
  }


  return (
    <div className='student-approval'>
      {getListView("Proposals", studentList)}
      {getListView("Accepted Proposals", acceptedList)}
      {getListView("Rejected Proposals", rejectedList)}

      <Button className='decide accept' disabled={!Boolean(acceptedList[0]) && !Boolean(rejectedList[0])}
        onClick={() => { submitProposalDecisions(userId, acceptedList, rejectedList) }} >Save</Button>

      <Button className='decide accept'
        onClick={() => { setOpenModal(true) }} >Preview</Button>
      <Modal
        open={modalIsOpen}
        onClose={!modalIsOpen}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {getPreviewView(previewData)}

      </Modal>
    </div>
  )
}
