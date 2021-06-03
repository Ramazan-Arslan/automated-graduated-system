import React from 'react';
import getRequestAGS from '../server_connections/AGS/getRequestAGS';
import postRequestAGS from '../server_connections/AGS/postRequestAGS';

export default class FormData extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {};

    componentDidMount() {
    }

    
    requestFormStatus = async (studentId, formId) => {
        var json = 
        {
            studentId: studentId,
            formId : formId
        }
        
        var path = ('/formData/requestFormStatus');
        var obj = await postRequestAGS(path,json);
        return obj.returned;
    }

    requestFormInputs = async (studentId, formId) => {
        var json = 
        {
            studentId: studentId,
            formId : formId
        }
        
        var path = ('/formData/requestFormInputs');
        var obj = await postRequestAGS(path,json);
        return obj.returned;
    }

    adjustFormInputs = async (studentId, form) =>
    {
        var json = 
        {
            studentId: studentId,
            form : form
        }
        
        var path = ('/formData/adjustFormInputs');
        var obj = await postRequestAGS(path,json);
        return obj.returned;
    }

    adjustFormStatus = async (studentId, formId, status) =>
    {
        var json = 
        {
            studentId: studentId,
            formId : formId,
            status : status
        }
        
        var path = ('/formData/adjustFormStatus');
        var obj = await postRequestAGS(path,json);
        return obj.returned;
    }

    render() {
        return null;
    }
}

