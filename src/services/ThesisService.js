import React from 'react';
import ThesisData from '../data_access/ThesisData';

const thesisData = new ThesisData();


export default class ThesisService extends React.Component {

    constructor(props) {
        super(props);

    }

    state =
        {
        };



    componentDidMount() {
    }



    getThesisStatus = async (studentId) => {

        const obj = await thesisData.requestThesisStatus(studentId);
        return obj;
    }

    getThesisData = async (studentId) => {
        const obj = await thesisData.requestThesisInputs(studentId);
        return obj;
    }

    getThesisInfo = async (studentId) =>
    {
        const obj = await thesisData.requestThesisInfo(studentId);
        return obj;
    }

    setThesisData = async (studentId, thesis) => {
        const msg = await thesisData.adjustThesisInputs(studentId, thesis);
        return msg;
    }

    setThesisStatus = async (studentId, status) => {
        const msg = await thesisData.adjustThesisStatus(studentId, status);
        return msg;
    }

    setThesisInfo = async (studentId, thesis) => {
        const obj = await thesisData.adjustThesisInfo(studentId,thesis);
        return obj;
    }



    render() {
        return null;
    }
}

