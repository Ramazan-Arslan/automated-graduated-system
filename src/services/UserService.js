import React from 'react';
import UserData from '../data_access/UserData';
import AdvisorData from '../data_access/AdvisorData';
import StudentData from '../data_access/StudentData';

const userData = new UserData();
const advisorData = new AdvisorData();
const studentData = new StudentData();


export default class UserService extends React.Component {

    constructor(props) {
        super(props);
      
    }

    state =
        {
        };



    componentDidMount() {
        //this.authentication();
    }



    getUserInfo = async (userId, userType) => {
       
    
        const obj = await userData.requestUserData(userId, userType);
        return obj;
    }

    getSpecificUserInfo = async (url) => {
     
        const obj = await userData.requestSpecificUserData(url);
        return obj;
    }

    getDepartmentAdvisors= async(departmentName) =>
    {
        const obj = await advisorData.requestAdvisorsData(departmentName);
        return obj;
    }

    getStudentProposals= async(advisorId) =>
    {
        const obj = await advisorData.requestProposals(advisorId);
        return obj;
    }

    getDecidedProposals= async(advisorId) =>
    {
        const obj = await advisorData.requestDecidedProposals(advisorId);
        return obj;
    }

    setStudentProposal = async(studentId,advisorId) =>
    {
        const resultMessage = await studentData.adjustStudentAdvisorInfo(studentId,advisorId);
        return resultMessage;
    }

    setProposalDecisions = async(advisorId,acceptedList,rejectedList) =>
    {
        const resultMessage = await advisorData.adjustAdvisorProposalDecisions(advisorId,acceptedList,rejectedList);
        return resultMessage;
    }

    accessControl = async(url) =>
    {
        const accessResult = await userData.isAccessible(url);
        return accessResult;
    }


    render() {
        return null;
    }
}

