import React, { useState } from 'react'
import './thesis-defense-jury-appointment-by-advisor.component.css'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import Lock from '@material-ui/icons/Lock'
import InputAdornment from '@material-ui/core/InputAdornment'
import Modal from '@material-ui/core/Modal'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  paper: {
    position: 'absolute',
    width: 1000,
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

export default function JuryAppointmentByAdvisor() {
  const [modalIsOpen, setOpenModal] = useState(false)

  const [state, setState] = React.useState({
    name: '',
    institute: '',
    department: '',
  })
  function handleChange(evt) {
    const value = evt.target.value
    setState({
      ...state,
      [evt.target.name]: value,
    })
  }

  const [juryList, setJuryList] = React.useState([
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
  ])

  function addJury() {
    let jury = [
      {
        name: state.name,
        institute: state.institute,
        department: state.department,
      },
    ]
    setJuryList({
      juryList: [...juryList, jury],
    })
  }

  let contentList = [
    {
      label: 'Name Surname',
      content: 'furkan sahin',
    },
    {
      label: 'Program',
      content: 'studentObject.email',
    },
    {
      label: 'Student ID',
      content: 'studentObject.id',
    },
    {
      label: 'Advisor',
      content: 'studentObject.id',
    },
    {
      label: 'Thesis Name',
      content: 'studentObject.id',
    },
  ]
  /*
  let juryList = [
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
*/
  const classes = useStyles()
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
      <h1 className='thesis-defense-preview-title'>
        Thesis Defense Jury Appoinment(Preview)
      </h1>
      <div className='thesis-defense-preview-content'>
        <div className='default-inputlar'>
          {contentList.map((varib) => (
            <div className='default-label' key={varib.content}>
              <p>{varib.label}</p>
              <TextField
                className='default-textfield name'
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
        <div className='table-content'>
          {juryList.map((jury) => (
            <div key={jury.name}>
              <TextField
                className='table-textfield'
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
                className='table-textfield'
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
                className='table-textfield'
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
    <div className='jury-appoinment-by-advisor'>
      <h1 className='thesis-defense-header'>Thesis Defense Jury Appoinment</h1>
      <div className='jury-appointment-content'>
        <div className='default-inputlar'>
          {contentList.map((varib) => (
            <div className='default-label' key={varib.content}>
              <p>{varib.label}</p>
              <TextField
                className='default-textfield name'
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
        <div className='jury-adding'>
          <div className='add-jury'>
            <form className={classes.root} noValidate autoComplete='off'>
              <ul className='add-jury-ul'>
                <li>
                  <TextField
                    id='standard-basic'
                    label='Jury Name & Surname'
                    name='name'
                    value={state.name}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <TextField
                    id='standard-basic'
                    label='Institute Name'
                    name='institute'
                    value={state.institute}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <TextField
                    id='standard-basic'
                    label='Department'
                    name='department'
                    value={state.department}
                    onChange={handleChange}
                  />
                </li>
              </ul>
            </form>

            <Button onClick={addJury}>ADD</Button>
          </div>
          {/*<div>
            <p>{state.name}</p>
            <p>{state.institute}</p>
            <p>{state.department}</p>
          </div>
          */}

          <div className='table'>
            <div className='table-p'>
              <p>Jury Name & Surname</p>
              <p>Institute Name</p>
              <p>Department</p>
            </div>
            <div className='table-content'>
              {juryList.map((jury) => (
                <div key={jury.name}>
                  <TextField
                    className='table-textfield'
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
                    className='table-textfield'
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
                    className='table-textfield'
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
          </div>
        </div>
      </div>
      <div className='jury-appointment-buttons'>
        <Button className='button '>
          <p style={{ fontWeight: 'Bold' }}>PUBLISH</p>
        </Button>
        <Button className='button send-back'>
          <p style={{ fontWeight: 'Bold' }}>SEND BACK</p>
        </Button>
        <Button
          className='button preview'
          onClick={() => {
            setOpenModal(true)
          }}
        >
          <p style={{ fontWeight: 'Bold' }}>PREVIEW</p>
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
