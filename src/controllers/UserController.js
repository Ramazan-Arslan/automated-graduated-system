import React from 'react';
import UserService from '../services/UserService';

export default class UserController extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {};


    componentDidMount() {
    }


    takeUserInfo = async (userId, type) => {
        var message = "";
        if (Boolean(userId) && Boolean(type)) {
            const userService = new UserService();
            const obj = await userService.getUserInfo(userId, type);

            if (Boolean(obj)) {
                return obj;
            }

            else {
                message = "Error while getting data.\n";
                return message;
            }

        }
        else {
            message = "UserId or UserType is empty.\n";
            return message;
        }
    }

    takeSpecificUserInfo = async (url) => {
        var message = "";
        const userService = new UserService();
        const obj = await userService.getSpecificUserInfo(url);

        if (Boolean(obj)) {
            return obj;
        }

        else {
            message = "Error while getting data.\n";
            return message;
        }
    }

    takeDepartmentAdvisors = async (departmentName) => {
        var message = "";
        if (Boolean(departmentName)) {
            const userService = new UserService();
            const advisorList = await userService.getDepartmentAdvisors(departmentName);

            if (Array.isArray(advisorList) && Boolean(advisorList[0])) {
                return advisorList;
            }

            else {
                message = "Error while getting data.\n";
                return message;
            }

        }
        else {
            message = "Department name is empty.\n";
            return message;
        }
    }

    takeStudentProposals = async(advisorId) =>
    {
        var message = "";
        if (Boolean(advisorId)) {
            const userService = new UserService();
            const studentList = await userService.getStudentProposals(advisorId);
            if (Array.isArray(studentList) && Boolean(studentList[0])) {
                return studentList;
            }

            else {
                message = "Error while getting data.\n";
                return message;
            }

        }
        else {
            message = "Advisor id is empty.\n";
            return message;
        }
    }

    
    takeDecidedProposals = async(advisorId) =>
    {
        var message = "";
        if (Boolean(advisorId)) {
            const userService = new UserService();
            const studentList = await userService.getDecidedProposals(advisorId);
            if (Array.isArray(studentList) && Boolean(studentList[0])) {
                return studentList;
            }

            else {
                message = "Error while getting data.\n";
                return message;
            }

        }
        else {
            message = "Advisor id is empty.\n";
            return message;
        }
    }

    submitStudentProposal = async (studentId, advisorId) => {
        if (Boolean(advisorId)) {
            const userService = new UserService();
            const resultMessage = await userService.setStudentProposal(studentId, advisorId);

            return resultMessage;

        }
        else {
            var message = "Advisor is not selected.\n";
            return message;
        }
    }

    submitProposalDecisions = async (advisorId,acceptedList,rejectedList) => {
        if (Boolean(advisorId) && (Boolean(acceptedList[0]) || Boolean(rejectedList[0])) ) {
            const userService = new UserService();
            const resultMessage = await userService.setProposalDecisions(advisorId,acceptedList,rejectedList);
            console.log(resultMessage)
            return resultMessage;

        }
        else {
            var message = "Error with id.\n";
            return message;
        }
    }

    isStudentHasAccess = async (url) => {
        const userService = new UserService();
        const accessResult = await userService.accessControl(url);
        if (accessResult) {
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

