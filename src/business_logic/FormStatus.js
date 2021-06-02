import React from 'react';
import FormService from '../services/FormService';

export default class FormStatus extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {};


    componentDidMount() {
    }


    isFormAccessible = async (studentId, formId) => {

        const formService = new FormService();
        const accessResult = await formService.getFormStatus(studentId, formId)
        if (accessResult==="Form is not found") {
            return true;
        }
        else {
            return false;
        }
    }

    isFormSubmitted = async (studentId, formId) => {

        const formService = new FormService();
        const accessResult = await formService.getFormStatus(studentId, formId)
        if (accessResult==="Sent") {
            return true;
        }
        else {
            return false;
        }
    }




    render() {
        return null;
    }
}

