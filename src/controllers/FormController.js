import React from 'react';
import FormStatus from '../business_logic/FormStatus';
import FormService from '../services/FormService';

export default class FormController extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {};


    componentDidMount() {
    }


    takeFormStatus = async (studentId, formId) => {
        const formStatus = new FormStatus();
        const accessResult = await formStatus.isFormAccessible(studentId, formId);
        if (accessResult) {
            return true;
        }
        else {
            return false;
        }
    }


    takeFormData = async (studentId, formId) => {
        const formService = new FormService();
        const formData = await formService.getFormData(studentId, formId);
        if(Boolean(formData))
        {
            return formData
        }
        else
        {
            return null
        }
    }

    coordinateFormData = async (studentId, form) => {
           
        const formService = new FormService();
        const msg = await formService.setFormData(studentId, form);
    
        if(msg === "Set")
        {
            return true
        }
        else
        {
            return false
        }
       
    }

    coordinateFormStatus = async (studentId, formId, status) => {
           
        const formService = new FormService();
        const msg = await formService.setFormStatus(studentId, formId, status);
    
        if(msg === "Set")
        {
            return true
        }
        else
        {
            return false
        }
       
    }




    render() {
        return null;
    }
}

