import React from 'react';
import getRequestAGS from '../server_connections/AGS/getRequestAGS';
import postRequestAGS from '../server_connections/AGS/postRequestAGS';

export default class StudentData extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {};

    componentDidMount() {
    }

    
    adjustStudentAdvisorInfo = async (studentId, advisorId) => {
        var json = 
        {
            studentId: studentId,
            advisorId : advisorId
        }
        
        var path = ('/studentData/adjustStudentAdvisorInfo');
        var obj = await postRequestAGS(path,json);
        return obj.returned;
    }

    render() {
        return null;
    }
}

