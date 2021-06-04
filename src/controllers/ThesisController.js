import React from 'react';
import ThesisService from '../services/ThesisService';

export default class ThesisController extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {};


    componentDidMount() {
    }


    takeThesisData = async (studentId) => {
        const thesisService = new ThesisService();
        const thesisData = await thesisService.getThesisData(studentId);
        if(Boolean(thesisData))
        {
            return thesisData
        }
        else
        {
            return null
        }
    }


    takeThesisStatus = async (studentId) => {
        const thesisService = new ThesisService();
        const thesisStatus = await thesisService.getThesisStatus(studentId);
        if(thesisStatus === "Submitted")
        {
            return thesisStatus
        }
        else
        {
            return ""
        }
    }

    takeThesisInfo = async (studentId) => {
        const thesisService = new ThesisService();
        const thesisInfo = await thesisService.getThesisInfo(studentId);
        if(Boolean(thesisInfo))
        {
            return thesisInfo
        }
        else
        {
            return null
        }
    }

    coordinateThesisData = async (studentId, thesis) => {
           
        const thesisService = new ThesisService();
        const msg = await thesisService.setThesisData(studentId,thesis);  
        if(msg === "Thesis file is submitted")
        {
            return true
        }
        else
        {
            return false
        }
       
    }

    coordinateThesisStatus = async (studentId, status) => {
           
        const thesisService = new ThesisService();
        const msg = await thesisService.setThesisStatus(studentId,status);  
    
        if(msg === "Set")
        {
            return true
        }
        else
        {
            return false
        }
       
    }

    coordinateThesisInfo = async (studentId, thesis) => {
           
        const thesisService = new ThesisService();
        const msg = await thesisService.setThesisInfo(studentId,thesis);  
    
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

