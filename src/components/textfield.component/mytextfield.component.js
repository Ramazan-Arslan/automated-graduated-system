import React from 'react'
import './mytextfield.component.css';
import TextField from '@material-ui/core/TextField';
import Lock from '@material-ui/icons/Lock';
import InputAdornment from '@material-ui/core/InputAdornment';




export default function MyTextField(props){
    return(
    <div className='inputlar'>
        {props.myprops.map((varib) => 
            (
            <div className="label" key={varib.content}>
            <p>{varib.label}</p>
            <TextField
                  className="textfield name"
                  defaultValue={varib.content}
                  disabled
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="start">
                         <Lock/>
                        </InputAdornment>
                      ),
                  }}
                
                  rowsMax={4}
                />
                </div>
            )
            )}
    </div>

    
    );



}