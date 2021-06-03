import React from 'react';
import FormData from '../data_access/FormData';

const formData = new FormData();


export default class FormService extends React.Component {

    constructor(props) {
        super(props);

    }

    state =
        {
        };



    componentDidMount() {
    }



    getFormStatus = async (studentId, formId) => {

        const obj = await formData.requestFormStatus(studentId, formId);
        return obj;
    }

    getFormData = async (studentId, formId) => {

        const obj = await formData.requestFormInputs(studentId, formId);
        return obj;
    }

    setFormData = async (studentId, form) => {
        const msg = await formData.adjustFormInputs(studentId, form);
        return msg;
    }

    setFormStatus = async (studentId, formId, status) => {
        const msg = await formData.adjustFormStatus(studentId, formId, status);
        return msg;
    }



    render() {
        return null;
    }
}

