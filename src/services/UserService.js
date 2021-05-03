import React from 'react';
import UserData from '../data_access/UserData';

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
        const userData = new UserData();
        const obj = await userData.requestUserData(userId, userType);
        return obj;
    }

    getSpecificUserInfo = async (url) => {
        const userData = new UserData();
        const obj = await userData.requestSpecificUserData(url);
        return obj;
    }

    getDepartmentAdvisors= async(departmentName) =>
    {
        const userData = new UserData();
        const obj = await userData.requestAdvisorsData(departmentName);
        return obj;
    }

    setStudentProposal = async(studentId,advisorId) =>
    {
        const userData = new UserData();
        const resultMessage = await userData.adjustStudentAdvisorInfo(studentId,advisorId);
        return resultMessage;
    }

    accessControl = async(url) =>
    {
        const userData = new UserData();
        const accessResult = await userData.isAccessible(url);
        return accessResult;
    }


    render() {
        return null;
    }
}

